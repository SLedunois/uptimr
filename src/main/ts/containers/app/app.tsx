import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {gql, useQuery} from "@apollo/client";

import Sidebar, {INavigationItem} from "@components/sidebar";
import {HeartbeatsBadge, IncidentsBadge, MonitorBadge} from "@components/badge";
import Header from "./header";
import Monitors from "@app/containers/monitors/monitors";
import Heartbeats from "@app/containers/heartbeats/Heartbeats";
import Incidents from "@app/containers/incidents/Incidents";

const navigation: INavigationItem[] = [
    {
        key: 'navigation.monitors',
        icon: <MonitorBadge/>,
        path: '/monitors'
    },
    {
        key: 'navigation.heartbeats',
        icon: <HeartbeatsBadge/>,
        path: '/heartbeats'
    },
    {
        key: 'navigation.incidents',
        icon: <IncidentsBadge/>,
        path: '/incidents'
    }
]

const FETCH_USER = gql`
query getCurrentUser($username: String) {
    getUser(username: $username) {
        id
        username
        lastname
        firstname
    }
}
`

const App = () => {
    const {loading, error, data} = useQuery(FETCH_USER, {variables: {username: null}});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Router>
            <div className="flex flex-row flex-1 w-full bg-background min-h-screen">
                <Header user={data.getUser}/>
                <Sidebar navigation={navigation}/>
                <div className="w-full h-full pt-20 pl-20">
                    <Switch>
                        <Route path="/monitors">
                            <Monitors/>
                        </Route>
                        <Route path="/heartbeats">
                            <Heartbeats/>
                        </Route>
                        <Route path="/incidents">
                            <Incidents/>
                        </Route>
                        <Route path="/" exact>
                            <Redirect to="/monitors"/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
};

export default App;