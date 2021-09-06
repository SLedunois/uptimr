package fr.uptimr.startup;

import fr.uptimr.bean.User;
import fr.uptimr.repository.UserRepository;
import io.quarkus.arc.log.LoggerName;
import io.quarkus.runtime.StartupEvent;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.Duration;

@Singleton
public class DefaultUser {

    @LoggerName("fr.uptimr.Startup")
    Logger log;

    @Inject
    UserRepository users;

    @ConfigProperty(name = "uptimr.default.user")
    String username;

    @ConfigProperty(name = "uptimr.default.password")
    String password;

    @ConfigProperty(name = "uptimr.default.firstname")
    String firstname;

    @ConfigProperty(name = "uptimr.default.lastname")
    String lastname;

    public void loadDefaultUser(@Observes StartupEvent evt) {
        log.info("Checking default user.");

        users.findByUsername(username)
                .onItem().ifNull().switchTo(() -> {
                    log.info("Default user does not exists. Launching default user creation.");
                    return users.persist(User.create(username, firstname, lastname, password, "admin"));
                })
                .onItem().transform(defaultUser -> {
                    log.info(String.format("Default user in database. Username: %s", defaultUser.username));
                    return defaultUser;
                })
                .await().atMost(Duration.ofSeconds(10));
    }
}
