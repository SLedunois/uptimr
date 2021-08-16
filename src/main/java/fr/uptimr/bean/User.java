package fr.uptimr.bean;

import io.quarkus.arc.log.LoggerName;
import io.vertx.mutiny.sqlclient.Row;
import org.jboss.logging.Logger;

public class User {
    @LoggerName("fr.uptimr.User")
    static Logger log;

    private String id;
    private String username;
    private String password;
    private String role;
    private String salt;
    private int iteration;

    public String id() {
        return this.id;
    }

    public String username() {
        return this.username;
    }

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
        return this.id() == null;
    }

    public static User create(String username, String password, String role) {
        var user = new User();
        user.username = username;
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
        user.id = row.getString("id");
        user.username = row.getString("username");
        user.role = row.getString("role");
        user.password = row.getString("password");
        return user;
    }
}
