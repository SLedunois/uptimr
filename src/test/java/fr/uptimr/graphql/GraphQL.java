package fr.uptimr.graphql;

import io.restassured.response.Response;
import io.vertx.core.json.JsonObject;

import static io.restassured.RestAssured.given;

public class GraphQL {
    static Response query(String name, String query, JsonObject params) {
        var body = new JsonObject()
                .put("operationName", name)
                .put("query", query)
                .put("variables", params);

        return given()
                .when()
                .body(body.encodePrettily())
                .post("/graphql");
    }
}
