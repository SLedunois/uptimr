package fr.uptimr.bean;

import io.quarkus.arc.log.LoggerName;
import io.vertx.mutiny.sqlclient.Row;
import org.jboss.logging.Logger;

import java.util.Objects;
import java.util.UUID;

public class User {
    @LoggerName("fr.uptimr.startup.User")
    static Logger log;

    public UUID id;
    public String username;
    public String firstname;
    public String lastname;
    private String password;
    private String role;
    private String salt;
    private int iteration;

    public String password() {
        return this.password;
    }

    public String role() {
        return this.role;
    }

    public String salt() {
        return this.salt;
    }

    public int iteration() {
        return this.iteration;
    }

    public boolean isNew() {
        return Objects.isNull(this.id);
    }

    public static User create(String username, String firstname, String lastname, String password, String role) {
        var user = new User();
        user.username = username;
        user.firstname = firstname;
        user.lastname = lastname;
        user.role = role;
        try {
            var pwd = new Password(password);
            user.password = pwd.password();
            user.salt = pwd.salt();
            user.iteration = Password.ITERATION_COUNT;
        } catch (Exception e) {
            log.error(String.format("Unable to generate password for password %s", password), e);
        }

        return user;
    }

    public static User from(Row row) {
        var user = new User();
        user.id = row.get(UUID.class, "id");
        user.username = row.getString("username");
        user.firstname = row.getString("firstname");
        user.lastname = row.getString("lastname");
        user.role = row.getString("role");
        user.password = row.getString("password");
        return user;
    }
}
