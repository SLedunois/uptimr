package fr.uptimr.graphql;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import io.vertx.core.json.JsonObject;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestSecurity(user = "tom.mate", roles = {"admin"})
public class UserResourceTest {

    private JsonObject query(String username) {
        String query = "query getCurrentUser($username: String) {" +
                "   getUser(username: $username) {" +
                "       id" +
                "       username" +
                "       lastname" +
                "       firstname" +
                "   }" +
                "}";

        JsonObject variables = new JsonObject()
                .put("username", username);

        return new JsonObject()
                .put("operationName", "getCurrentUser")
                .put("query", query)
                .put("variables", variables);
    }

    @Test
    @DisplayName("Requesting user with null username parameter should returns current user")
    void currentUser() {
        given()
                .when()
                .body(query(null).encodePrettily())
                .post("/graphql")
                .then()
                .contentType(ContentType.JSON)
                .body("data.getUser.username", is("tom.mate"))
                .statusCode(HttpStatus.SC_OK);
    }

    @Test
    @DisplayName("Requesting user with specific username parameter should returns given user data")
    void user() {
        given()
                .when()
                .body(query("tom.mate").encodePrettily())
                .post("/graphql")
                .then()
                .contentType(ContentType.JSON)
                .body("data.getUser.username", is("tom.mate"))
                .statusCode(HttpStatus.SC_OK);
    }

    @Test
    @DisplayName("Requesting unknown user should returns null value")
    void unknownUser() {
        given()
                .when()
                .body(query("john.doe").encodePrettily())
                .post("/graphql")
                .then()
                .contentType(ContentType.JSON)
                .body("data.getUser", is(nullValue()))
                .statusCode(HttpStatus.SC_OK);
    }
}
