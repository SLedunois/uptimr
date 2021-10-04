package fr.uptimr.graphql;

import fr.uptimr.bean.DBConnectOptions;
import fr.uptimr.bean.Monitor;
import io.quarkus.arc.log.LoggerName;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.operators.multi.processors.BroadcastProcessor;
import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.core.Vertx;
import io.vertx.mutiny.pgclient.pubsub.PgSubscriber;
import org.jboss.logging.Logger;
import org.jboss.resteasy.reactive.RestSseElementType;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

// Just a trick waiting https://github.com/smallrye/smallrye-graphql/issues/811 being released

@Path("/subscribers/monitors")
public class MonitorSubscriber {
    @LoggerName("Monitor subscriber")
    Logger log;

    @Inject
    Vertx vertx;

    PgSubscriber subscriber;
    BroadcastProcessor<Monitor> processor = BroadcastProcessor.create();
    Map<UUID, BroadcastProcessor<Monitor>> processorStore = new HashMap<>();

    @PostConstruct
    public void init() {
        subscriber = PgSubscriber.subscriber(vertx, DBConnectOptions.options());
        subscriber.channel("monitor_state_changes")
                .handler(payload -> processor.onNext(Monitor.from(new JsonObject(payload))));
        subscriber.channel("monitor_last_check_change")
                .handler(this::lastCheckChanges);
        subscriber.connect()
                .subscribe().with(unused -> log.debug("PgSubscriber successfully connected"));
    }

    private void lastCheckChanges(String payload) {
        var monitor = Monitor.from(new JsonObject(payload));
        if (processorStore.containsKey(monitor.id)) {
            processorStore.get(monitor.id).onNext(monitor);
        }
    }

    @PreDestroy
    public void kill() {
        if (Objects.nonNull(subscriber)) {
            subscriber.close();
        }

        processorStore.clear();
    }

    @GET
    @Path("/status")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    @RestSseElementType(MediaType.APPLICATION_JSON)
    public Multi<Monitor> notifyMonitors() {
        return processor;
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    @RestSseElementType(MediaType.APPLICATION_JSON)
    public Multi<Monitor> notify(UUID id) {
        if (!processorStore.containsKey(id)) {
            processorStore.put(id, BroadcastProcessor.create());
        }

        return processorStore.get(id);
    }
}
