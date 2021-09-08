package fr.uptimr;

import fr.uptimr.i18n.I18N;
import io.quarkus.qute.Template;
import io.quarkus.security.identity.SecurityIdentity;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.HashMap;

@Path("/auth")
public class AuthResource {

    @Inject
    SecurityIdentity identity;

    @Inject
    Template signin;

    @GET
    @Path("/sign-in")
    @Produces(MediaType.TEXT_HTML)
    public Response signIn(@Context HttpHeaders headers, @QueryParam("error") String error) {
        if (identity.isAnonymous()) {
            var lang = I18N.getLocale(headers);
            var data = new HashMap<>();
            data.put("error", error);
            return Response.ok(signin.instance().setAttribute("locale", lang).data(data).render()).build();
        }

        return Response.temporaryRedirect(URI.create("/")).build();
    }
}
