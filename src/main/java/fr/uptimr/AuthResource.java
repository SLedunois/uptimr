package fr.uptimr;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

@Path("/auth")
public class AuthResource {

    @Inject
    Template signin;

    @GET
    @Path("/sign-in")
    public TemplateInstance signin(@QueryParam("error") String error) {
        return signin.data("error", error);
    }
}
