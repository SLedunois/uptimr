package fr.uptimr.bean;

import java.util.HashMap;

import io.vertx.core.json.JsonObject;

public class MonitorCheck {
    public String type;
    public String expression;
    public String value;
    public int statusCode;

    public static MonitorCheck from(JsonObject obj) {
        var check = new MonitorCheck();
        check.type = obj.getString("expected_content_type");
        check.expression = obj.getString("expected_content_expression");
        check.statusCode = obj.getInteger("expected_status_code");
        check.value = obj.getString("expected_content_value");
        return check;
    }

    public JsonObject toJson() {
        return new JsonObject().put("type", this.type).put("expression", this.expression).put("value", this.value)
                .put("statusCode", this.statusCode);
    }
}
