package fr.uptimr.repository;

import fr.uptimr.bean.Metric;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;

import javax.enterprise.context.ApplicationScoped;

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
}
