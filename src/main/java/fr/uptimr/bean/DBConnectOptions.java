package fr.uptimr.bean;

import io.vertx.pgclient.PgConnectOptions;
import org.eclipse.microprofile.config.ConfigProvider;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DBConnectOptions {

    public PgConnectOptions connectOptions() {
        return PgConnectOptions.fromUri(ConfigProvider.getConfig().getValue("uptimr.datasource.pg", String.class))
                .setUser(ConfigProvider.getConfig().getValue("quarkus.datasource.username", String.class))
                .setPassword(ConfigProvider.getConfig().getValue("quarkus.datasource.password", String.class));
    }

    public static PgConnectOptions options() {
        return new DBConnectOptions().connectOptions();
    }
}
