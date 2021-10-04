package fr.uptimr.bean;

import fr.uptimr.scheduler.Processor;
import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.sqlclient.Row;
import org.quartz.*;

import java.util.UUID;

public class Monitor {
    public UUID id;
    public String name;
    public String target;
    public String cron;
    public UUID owner;
    public String status;
    public String uptime;
    public String lastCheck;
    public MonitorCheck check;

    public static Monitor from(Row row) {
        return Monitor.from(row.toJson());
    }

    public static Monitor from(JsonObject obj) {
        var monitor = new Monitor();
        monitor.id = UUID.fromString(obj.getString("id"));
        monitor.name = obj.getString("name");
        monitor.target = obj.getString("target");
        monitor.cron = obj.getString("cron");
        monitor.owner = UUID.fromString(obj.getString("owner"));
        monitor.status = obj.getString("status");
        monitor.uptime = obj.getString("uptime");
        monitor.lastCheck = obj.getString("last_check");
        monitor.check = MonitorCheck.from(obj);
        return monitor;
    }

    public JsonObject toJson() {
        return new JsonObject()
                .put("id", this.id)
                .put("name", this.name)
                .put("target", this.target)
                .put("cron", this.cron)
                .put("owner", this.owner)
                .put("status", this.status)
                .put("lastCheck", this.lastCheck)
                .put("check", this.check.toJson());
    }

    public JobDetail job() {
        var data = new JobDataMap();
        data.put("monitor", this);
        return JobBuilder.newJob(Processor.class)
                .setJobData(data)
                .withIdentity(this.id.toString())
                .build();
    }

    public Trigger trigger() {
        return TriggerBuilder.newTrigger()
                .withIdentity(this.id.toString())
                .startNow()
                .withSchedule(CronScheduleBuilder.cronSchedule(this.cron))
                .build();
    }
}
