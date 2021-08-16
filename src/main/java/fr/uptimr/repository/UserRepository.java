package fr.uptimr.repository;

import fr.uptimr.bean.User;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.UUID;

@ApplicationScoped
public class UserRepository {
    @Inject
    PgPool client;

    public Uni<User> persist(User user) {
        Uni<RowSet<Row>> uni;
        if (user.isNew()) {
            uni = client.preparedQuery("INSERT INTO users (id, username, password, salt, iteration,  role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *")
                    .execute(Tuple.of(UUID.randomUUID().toString(), user.username(), user.password(), user.salt(), user.iteration(), user.role()));
        } else {
            uni = client.preparedQuery("UPDATE users SET username = $1, password = $2, role = $3 RETURNING *")
                    .execute(Tuple.of(user.username(), user.password(), user.role()));
        }

        return uni.onItem().transform(RowSet::iterator)
                .onItem().transform(u -> u.hasNext() ? User.from(u.next()) : null);
    }

    public Uni<User> findByUsername(String username) {
        return client.preparedQuery("SELECT id, username, password, role FROM users WHERE username = $1")
                .execute(Tuple.of(username))
                .onItem().transform(RowSet::iterator)
                .onItem().transform(u -> u.hasNext() ? User.from(u.next()) : null);
    }
}
