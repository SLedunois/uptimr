package fr.uptimr.scheduler;

import com.jayway.jsonpath.JsonPath;
import fr.uptimr.bean.Metric;
import fr.uptimr.bean.Monitor;
import fr.uptimr.repository.MetricRepository;
import io.quarkus.arc.log.LoggerName;
import io.quarkus.runtime.util.ExceptionUtil;
import io.vertx.core.net.ProxyOptions;
import io.vertx.ext.web.client.WebClientOptions;
import io.vertx.mutiny.core.Vertx;
import io.vertx.mutiny.core.buffer.Buffer;
import io.vertx.mutiny.ext.web.client.HttpResponse;
import io.vertx.mutiny.ext.web.client.WebClient;
import io.vertx.mutiny.pgclient.PgPool;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.IOException;
import java.io.StringReader;
import java.net.URL;
import java.sql.Timestamp;
import java.util.Objects;
import java.util.Optional;

@ApplicationScoped
public class Processor implements Job {

    @LoggerName("Scheduler job processor")
    Logger log;

    private final MetricRepository metrics;
    private final WebClient client;

    @Inject
    public Processor(Vertx vertx, PgPool client, @ConfigProperty(name = "uptimr.proxy") Optional<URL> proxyUrl) {
        var options = new WebClientOptions();
        if (proxyUrl.isPresent()) {
            var proxy = new ProxyOptions()
                    .setHost(proxyUrl.get().getHost())
                    .setPort(proxyUrl.get().getPort());

            if (!proxyUrl.get().getUserInfo().isEmpty()) {
                var username = proxyUrl.get().getUserInfo().split(":")[0];
                var password = proxyUrl.get().getUserInfo().split(":")[1];
                proxy.setUsername(username);
                proxy.setPassword(password);
            }
        }

        this.client = WebClient.create(vertx, options);
        this.metrics = new MetricRepository(client);
    }

    private String jsonCheck(Monitor monitor, String body) {
        var status = "ERROR";
        String check = JsonPath.read(body, monitor.check.expression);
        if (!check.isEmpty() && check.trim().equals(monitor.check.value)) {
            status = "SUCCESS";
        }

        return status;
    }

    private String xmlCheck(Monitor monitor, String body) throws ParserConfigurationException, IOException, SAXException, XPathExpressionException {
        var status = "ERROR";
        var builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        var source = new InputSource(new StringReader(body));
        var document = builder.parse(source);
        var xpath = XPathFactory.newInstance().newXPath();
        var value = xpath.compile(monitor.check.expression).evaluate(document);

        if (Objects.nonNull(value) && value.equals(monitor.check.value)) {
            status = "SUCCESS";
        }

        return status;
    }

    private String status(Monitor monitor, HttpResponse<Buffer> response) throws Exception {
        String body = null;
        var status = "ERROR";

        if (response.statusCode() == monitor.check.statusCode) {
            status = "SUCCESS";
        }

        if (Objects.nonNull(monitor.check.type)) {
            body = response.bodyAsString();
        }

        if (Objects.nonNull(monitor.check.type) && monitor.check.type.equals("json")) {
            status = jsonCheck(monitor, body);
        }

        if (Objects.nonNull(monitor.check.type) && monitor.check.type.equals("xml")) {
            status = xmlCheck(monitor, body);
        }

        return status;
    }

    private Metric performChecks(Monitor monitor, HttpResponse<Buffer> response, Metric metric, JobExecutionContext ctx) {
        metric.end();
        if (Objects.isNull(metric.stacktrace)) {
            try {
                metric.status = status(monitor, response);
            } catch (Exception e) {
                metric.status = "ERROR";
                metric.stacktrace = ExceptionUtil.generateStackTrace(e);
            }
        }

        metric.fireTime = new Timestamp(ctx.getFireTime().getTime()).toLocalDateTime();
        return metric;
    }

    @Override
    public void execute(JobExecutionContext ctx) throws JobExecutionException {
        var monitor = (Monitor) ctx.getJobDetail().getJobDataMap().get("monitor");
        var metric = Metric.from(monitor).start();
        client.getAbs(monitor.target)
                .send()
                .onFailure(throwable -> {
                    metric.stacktrace = ExceptionUtil.generateStackTrace(throwable);
                    return true;
                }).recoverWithNull()
                .onItem().transform(response -> performChecks(monitor, response, metric, ctx))
                .onItem().transformToUni(unused -> metrics.create(metric))
                .subscribe().with(obj -> log.debug(String.format("Metric %s saved form monitor %s", obj.fireTime, obj.monitorId.toString())));
    }
}
