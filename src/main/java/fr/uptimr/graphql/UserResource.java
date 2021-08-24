package fr.uptimr.graphql;

import fr.uptimr.bean.User;
import fr.uptimr.repository.UserRepository;
import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.mutiny.Uni;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Name;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;
import java.util.Objects;

@Authenticated
@GraphQLApi
public class UserResource {

    @Inject
    SecurityIdentity identity;

    @Inject
    UserRepository repository;

    @Query("getUser")
    @Description("Get user data based on given username. If username is null, it uses current authenticated username")
    public Uni<User> getUser(@Name("username") String username) {
        return repository.findByUsername(Objects.isNull(username) ? identity.getPrincipal().getName() : username);
    }
}
