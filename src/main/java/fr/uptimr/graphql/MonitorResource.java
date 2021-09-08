package fr.uptimr.graphql;

import fr.uptimr.bean.Monitor;
import fr.uptimr.exception.InvalidCronException;
import fr.uptimr.repository.MonitorRepository;
import fr.uptimr.repository.UserRepository;
import fr.uptimr.scheduler.SchedulerManager;
import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.core.eventbus.EventBus;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Query;
import org.quartz.CronScheduleBuilder;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.UUID;

@GraphQLApi
@ApplicationScoped
@Authenticated
public class MonitorResource {
    @Inject
    EventBus bus;

    @Inject
    SecurityIdentity identity;

    @Inject
    MonitorRepository monitors;

    @Inject
    UserRepository users;

    @Query("getMonitors")
    @Description("Get monitors. It retrieves all monitors stores in database")
    public Uni<List<Monitor>> getMonitors() {
        return monitors.list();
    }

    private void checkCronExpression(Monitor monitor) throws InvalidCronException {
        try {
            CronScheduleBuilder.cronSchedule(monitor.cron);
        } catch (RuntimeException e) {
            throw new InvalidCronException(e.getMessage());
        }
    }

    @Mutation
    @Description("Create a monitor")
    public Uni<Monitor> createMonitor(Monitor monitor) throws InvalidCronException {
        checkCronExpression(monitor);
        return users.findByUsername(identity.getPrincipal().getName())
                .onItem().transformToUni(user -> {
                    monitor.owner = user.id;
                    return monitors.create(monitor);
                })
                .onItem().transform(created -> {
                    bus.send(SchedulerManager.CREATION_ADDRESS, created);
                    return created;
                });
    }

    @Mutation
    @Description("Delete a monitor")
    public Uni<Monitor> deleteMonitor(UUID id) {
        return monitors.delete(id);
    }
}
