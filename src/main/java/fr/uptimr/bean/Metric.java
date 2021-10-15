package fr.uptimr.bean;

import io.vertx.mutiny.sqlclient.Row;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

public class Metric {
    public UUID monitorId;
    public String target;
    public long time;
    public String status;
    public LocalDateTime fireTime;
    public String stacktrace;

    private long startTime;
    private long endTime;

    public static Metric from(Row row) {
        var metric = new Metric();
        metric.target = row.getString("target");
        metric.monitorId = row.get(UUID.class, "monitor_id");
        metric.status = row.getString("status");
        metric.fireTime = row.getLocalDateTime("fire_time");
        metric.time = row.getLong("time");
        metric.stacktrace = row.getString("stacktrace");
        return metric;
    }

    public static Metric from(Monitor monitor) {
        var metric = new Metric();
        metric.monitorId = monitor.id;
        metric.target = monitor.target;
        metric.status = "ERROR";
        return metric;
    }

    public Metric start() {
        this.startTime = System.nanoTime();
        return this;
    }

    public Metric end() {
        this.endTime = System.nanoTime();
        this.time = Duration.ofNanos(this.endTime - this.startTime).toMillis();
        return this;
    }
}
