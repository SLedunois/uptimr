package fr.uptimr.graphql;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import io.vertx.core.json.JsonObject;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.*;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestSecurity(user = "tom.mate", roles = {"admin"})
class UserResourceTest {

    private static final String queryName = "getCurrentUser";
    private static final String query = "query getCurrentUser($username: String) {" +
            "   getUser(username: $username) {" +
            "       id" +
            "       username" +
            "       lastname" +
            "       firstname" +
            "   }" +
            "}";

    private static final JsonObject variables = new JsonObject()
            .put("username", "tom.mate");

    @Test
    @Order(1)
    @DisplayName("Requesting user with specific username parameter should returns given user data")
    void user() {
        GraphQL.query(queryName, query, variables)
                .then()
                .contentType(ContentType.JSON)
                .body("data.getUser.username", is("tom.mate"))
                .statusCode(HttpStatus.SC_OK);
    }

    @Test
    @Order(2)
    @DisplayName("Requesting user with null username parameter should returns current user")
    void currentUser() {
        GraphQL.query(queryName, query, variables.putNull("username"))
                .then()
                .contentType(ContentType.JSON)
                .body("data.getUser.username", is("tom.mate"))
                .statusCode(HttpStatus.SC_OK);
    }

    @Test
    @Order(3)
    @DisplayName("Requesting unknown user should returns null value")
    void unknownUser() {
        GraphQL.query(queryName, query, variables.put("username", "john.doe"))
                .then()
                .contentType(ContentType.JSON)
                .body("data.getUser", is(nullValue()))
                .statusCode(HttpStatus.SC_OK);
    }
}
