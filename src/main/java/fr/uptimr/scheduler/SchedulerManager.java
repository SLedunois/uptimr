package fr.uptimr.scheduler;

import fr.uptimr.bean.Monitor;
import io.quarkus.arc.log.LoggerName;
import io.quarkus.vertx.ConsumeEvent;
import org.jboss.logging.Logger;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@ApplicationScoped
public class SchedulerManager {
    public static final String CREATION_ADDRESS = "monitor.schedule.create";
    private static final Map<UUID, Monitor> store = new HashMap<>();

    @Inject
    Scheduler scheduler;

    @LoggerName("Scheduler manager")
    Logger log;

    @ConsumeEvent(SchedulerManager.CREATION_ADDRESS)
    public void createMonitor(Monitor monitor) {
        log.debug(String.format("Receiving monitor %s", monitor.id.toString()));
        try {
            scheduler.scheduleJob(monitor.job(), monitor.trigger());
            store.put(monitor.id, monitor);
        } catch (SchedulerException e) {
            log.error("Unable to create monitor job. Monitor throws a SchedulerException", e);
        }
    }
}
