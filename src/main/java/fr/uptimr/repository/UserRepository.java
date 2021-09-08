package fr.uptimr.repository;

import fr.uptimr.bean.User;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Arrays;

@Singleton
public class UserRepository {
    @Inject
    PgPool client;

    public Uni<User> persist(User user) {
        Uni<RowSet<Row>> uni;
        if (user.isNew()) {
            var params = Arrays.asList(user.username, user.password(), user.salt(), user.iteration(), user.role(), user.firstname, user.lastname);
            uni = client.preparedQuery("INSERT INTO users (username, password, salt, iteration,  role, firstname, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *")
                    .execute(Tuple.from(params));
        } else {
            uni = client.preparedQuery("UPDATE users SET username = $1, password = $2, role = $3, firstname = $4, lastname = $5 RETURNING *")
                    .execute(Tuple.of(user.username, user.password(), user.role(), user.firstname, user.lastname));
        }

        return uni.onItem().transform(RowSet::iterator)
                .onItem().transform(u -> u.hasNext() ? User.from(u.next()) : null);
    }

    public Uni<User> findByUsername(String username) {
        return client.preparedQuery("SELECT id, username, password, role, firstname, lastname FROM users WHERE username = $1")
                .execute(Tuple.of(username))
                .onItem().transform(RowSet::iterator)
                .onItem().transform(u -> u.hasNext() ? User.from(u.next()) : null);
    }
}
