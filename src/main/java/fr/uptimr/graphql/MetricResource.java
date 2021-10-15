package fr.uptimr.graphql;

import fr.uptimr.repository.MetricRepository;
import fr.uptimr.repository.TimeBucket;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Query;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@GraphQLApi
@ApplicationScoped
@Authenticated
public class MetricResource {
    @Inject
    MetricRepository metrics;

    @Query("getMetrics")
    @Description("Retrieve metrics based on provided monitor identifier")
    public Uni<List<TimeBucket>> getMetrics(UUID monitorID, LocalDateTime start, LocalDateTime end) {
        return metrics.retrieveTimeBuckets(monitorID, "1 minutes", start, end);
    }
}
