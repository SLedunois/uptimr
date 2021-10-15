package fr.uptimr.repository;

import fr.uptimr.bean.Metric;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;

import javax.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class MetricRepository {

    private final PgPool client;

    public MetricRepository(PgPool client) {
        this.client = client;
    }

    public Uni<Metric> create(Metric metric) {
        return client.preparedQuery("INSERT INTO monitors_metrics (monitor_id, target, time, status, fire_time, stacktrace) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *")
                .execute(Tuple.of(metric.monitorId, metric.target, metric.time, metric.status, metric.fireTime, metric.stacktrace))
                .onItem().transform(RowSet::iterator)
                .onItem().transform(m -> m.hasNext() ? Metric.from(m.next()) : null);
    }

    public Uni<List<TimeBucket>> retrieveTimeBuckets(UUID monitorId, String bucketWidth, LocalDateTime start, LocalDateTime end) {
        var query = "SELECT time_bucket('" + bucketWidth + "', fire_time) AS bucket, avg(time) as avg " +
                "FROM monitors_metrics " +
                "WHERE fire_time >= $1 " +
                "AND fire_time <= $2 " +
                "AND monitor_id = $3 " +
                "GROUP BY bucket " +
                "ORDER BY bucket ASC;";

        return client.preparedQuery(query)
                .execute(Tuple.of(start, end, monitorId))
                .onItem().transformToMulti(RowSet::toMulti)
                .map(TimeBucket::from)
                .collect().asList();
    }
}
