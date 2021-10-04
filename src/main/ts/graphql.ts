import {ApolloClient, InMemoryCache} from '@apollo/client';

declare const window: Window;

const graphql = new ApolloClient({
    uri: `${window.location.origin}/graphql`,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    }
});

export default graphql;