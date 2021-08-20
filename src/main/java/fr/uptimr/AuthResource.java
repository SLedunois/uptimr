package fr.uptimr;

import io.quarkus.qute.Template;
import io.quarkus.security.identity.SecurityIdentity;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Path("/auth")
public class AuthResource {

    @Inject
    SecurityIdentity identity;

    @Inject
    Template signin;

    @GET
    @Path("/sign-in")
    @Produces(MediaType.TEXT_HTML)
    public Response signin(@QueryParam("error") String error) {
        if (identity.isAnonymous()) {
            Map<String, String> data = new HashMap<>();
            data.put("error", error);
            return Response.ok(signin.render(data)).build();
        }

        return Response.temporaryRedirect(URI.create("/")).build();
    }
}
