import {ApolloClient, InMemoryCache} from '@apollo/client';

declare const window: Window;

const graphql = new ApolloClient({
    uri: `${window.location.origin}/graphql`,
    cache: new InMemoryCache()
});

export default graphql;