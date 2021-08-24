import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {gql, useQuery} from "@apollo/client";

import Sidebar, {INavigationItem} from "../../components/sidebar";
import {HeartbeatsBadge, IncidentsBadge, MonitorBadge} from "../../components/badge";
import Header from "./header";
import Monitors from "../monitors/monitors";
import Heartbeats from "../heartbeats/Heartbeats";
import Incidents from "../incidents/Incidents";

const navigation: INavigationItem[] = [
    {
        key: 'navigation.monitors',
        icon: <MonitorBadge/>,
        path: '/'
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
    console.log(loading, error, data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Router>
            <div className="flex flex-row flex-1 w-full">
                <Sidebar navigation={navigation}/>
                <div className="w-full">
                    <Header user={data.getUser}/>
                    <Switch>
                        <Route path="/" exact>
                            <Monitors/>
                        </Route>
                        <Route path="/heartbeats">
                            <Heartbeats/>
                        </Route>
                        <Route path="/incidents">
                            <Incidents/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
};

export default App;