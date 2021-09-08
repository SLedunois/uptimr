package fr.uptimr.graphql;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import io.vertx.core.json.JsonObject;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.*;

import static org.hamcrest.core.Is.is;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestSecurity(user = "tom.mate", roles = {"admin"})
class MonitorResourceTest {

    private static String monitorId;

    private static final JsonObject variables = new JsonObject()
            .put("name", "HTTP 200")
            .put("target", "http://localhost:30000/health_check")
            .put("cron", "0 0/1 * 1/1 * ?")
            .put("statusCode", HttpStatus.SC_OK)
            .putNull("type")
            .putNull("express")
            .putNull("value");

    @Test()
    @Order(1)
    @DisplayName("Create monitor should returns HTTP 200 and default values")
    void createDefaultMonitor() {
        var mutationName = "createMonitor";
        var query = "mutation " + mutationName + "($name: String, $target: String, $cron: String, $statusCode: Int!, $type: String, $expression: String, $value: String) {" +
                "  createMonitor(monitor: {" +
                "    name: $name" +
                "    target: $target" +
                "    cron: $cron" +
                "    owner: null" +
                "    id: null" +
                "    status: null" +
                "    check: {" +
                "        statusCode: $statusCode" +
                "        type: $type" +
                "        expression: $expression" +
                "        value: $value" +
                "    }" +
                "  }) {" +
                "    id" +
                "    name" +
                "    cron" +
                "    target" +
                "    status" +
                "    check {" +
                "       statusCode" +
                "    }" +
                "  }" +
                "}";

        monitorId = GraphQL.query(mutationName, query, variables)
                .then()
                .contentType(ContentType.JSON)
                .statusCode(HttpStatus.SC_OK)
                .body(String.format("data.%s.name", mutationName), is(variables.getString("name")))
                .body(String.format("data.%s.target", mutationName), is(variables.getString("target")))
                .body(String.format("data.%s.cron", mutationName), is(variables.getString("cron")))
                .body(String.format("data.%s.check.statusCode", mutationName), is(HttpStatus.SC_OK))
                .extract().jsonPath().getString(String.format("data.%s.id", mutationName));
    }

    @Test
    @Order(2)
    @DisplayName("Check previous created monitor getting list")
    void checkPreviousCreatedMonitor() {
        var query = "query getMonitors{" +
                "  getMonitors{" +
                "    id" +
                "  }" +
                "}";

        var monitors = GraphQL.query("getMonitors", query, new JsonObject())
                .then()
                .contentType(ContentType.JSON)
                .statusCode(HttpStatus.SC_OK)
                .extract().jsonPath().getList("data.getMonitors.id");

        Assertions.assertTrue(monitors.contains(monitorId));
    }

    @Test
    @Order(3)
    @DisplayName("Delete previous created monitor")
    void deletePreviousCreatedMonitor() {
        var mutationName = "deleteMonitor";
        var query = "mutation " + mutationName + "($id: String){" +
                "   deleteMonitor(id: $id) {" +
                "       id" +
                "   }" +
                "}";
        var variables = new JsonObject()
                .put("id", monitorId);

        GraphQL.query(mutationName, query, variables)
                .then()
                .statusCode(HttpStatus.SC_OK)
                .contentType(ContentType.JSON)
                .body(String.format("data.%s.id", mutationName), is(monitorId));
    }

    @Test
    @Order(4)
    @DisplayName("Check previous deleted monitor does not appears anymore in monitors list")
    void checkPreviousDeletedMonitorDoesNotAppearsInList() {
        var query = "query getMonitors{" +
                "  getMonitors{" +
                "    id" +
                "  }" +
                "}";

        var monitors = GraphQL.query("getMonitors", query, new JsonObject())
                .then()
                .contentType(ContentType.JSON)
                .statusCode(HttpStatus.SC_OK)
                .extract().jsonPath().getList("data.getMonitors.id");

        Assertions.assertFalse(monitors.contains(monitorId));
    }
}
