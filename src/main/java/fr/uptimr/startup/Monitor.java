package fr.uptimr.startup;

import fr.uptimr.repository.MonitorRepository;
import fr.uptimr.scheduler.SchedulerManager;
import io.quarkus.runtime.StartupEvent;
import io.smallrye.mutiny.Multi;
import io.vertx.mutiny.core.eventbus.EventBus;

import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.Duration;

@Singleton
public class Monitor {

    @Inject
    EventBus bus;

    @Inject
    MonitorRepository monitors;

    void loadMonitors(@Observes StartupEvent evt) {
        monitors.list()
                .onItem().transformToMulti(list -> Multi.createFrom().iterable(list))
                .onItem().transform(monitor -> bus.send(SchedulerManager.CREATION_ADDRESS, monitor))
                .collect().asList()
                .await().atMost(Duration.ofSeconds(10));
    }
}
