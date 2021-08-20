package fr.uptimr;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.authentication.FormAuthConfig;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.*;

import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Tag("integration")
class AuthRessourceTest {

    @Test
    @DisplayName("Unauthenticated should returns login page")
    @Order(1)
    void unauthenticatedShouldReturnsLoginPage() {
        get("/")
                .then()
                .statusCode(HttpStatus.SC_OK)
                .body("html.head.title", equalTo("Uptimr - Sign in"));
    }

    @Test
    @DisplayName("Login with default user")
    @Order(2)
    void loginWithDefaultUser() {
        given()
                .auth().form("tom.mate", "password", new FormAuthConfig("/auth/sign-in", "username", "password"))
                .when()
                .get("/auth/sign-in")
                .then()
                .statusCode(HttpStatus.SC_OK);
    }

    @Test
    @Order(3)
    void getLoginPageWithAuthenticatedUser() {
        given()
                .auth().form("tom.mate", "password", new FormAuthConfig("/auth/sign-in", "username", "password"))
                .when()
                .get("/auth/sign-in")
                .then()
                .statusCode(HttpStatus.SC_OK)
                .body("html.head.title", equalTo("Uptimr"));
    }
}
