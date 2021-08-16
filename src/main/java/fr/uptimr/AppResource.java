package fr.uptimr;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/")
@Authenticated
public class AppResource {
    @Inject
    Template index;

    @GET
    public TemplateInstance app() {
        return index.instance();
    }
}
