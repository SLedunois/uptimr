package fr.uptimr.repository;

import io.vertx.mutiny.sqlclient.Row;

import java.time.LocalDateTime;

public class TimeBucket {
    public LocalDateTime bucket;
    public Long average;

    public static TimeBucket from(Row row) {
        var metric = new TimeBucket();
        metric.bucket = row.getLocalDateTime("bucket");
        metric.average = row.getLong("avg");
        return metric;
    }
}
