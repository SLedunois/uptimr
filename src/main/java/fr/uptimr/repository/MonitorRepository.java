package fr.uptimr.repository;

import fr.uptimr.bean.Monitor;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Singleton
public class MonitorRepository {

    @Inject
    PgPool client;

    public Uni<List<Monitor>> list() {
        return client.query("SELECT * from monitors ORDER BY created ASC")
                .execute()
                .onItem().transformToMulti(RowSet::toMulti)
                .map(Monitor::from)
                .collect().asList();
    }

    public Uni<Monitor> create(Monitor monitor) {
        var params = Arrays.asList(monitor.name, monitor.target, monitor.cron, monitor.owner, monitor.check.statusCode, monitor.check.type, monitor.check.expression, monitor.check.value);
        return client.preparedQuery("INSERT INTO monitors (name, target, cron, owner, expected_status_code, expected_content_type, expected_content_expression, expected_content_value) " +
                        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *")
                .execute(Tuple.from(params))
                .onItem().transform(RowSet::iterator)
                .onItem().transform(u -> u.hasNext() ? Monitor.from(u.next()) : null);

    }

    public Uni<Monitor> delete(UUID id) {
        return client.preparedQuery("DELETE FROM monitors WHERE id = $1 RETURNING *")
                .execute(Tuple.of(id))
                .onItem().transform(RowSet::iterator)
                .onItem().transform(m -> m.hasNext() ? Monitor.from(m.next()) : null);
    }
}
