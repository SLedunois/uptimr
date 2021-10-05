import React, {FunctionComponent} from 'react';
import {Container} from "@components/container";
import {Route, Switch, useLocation, useRouteMatch} from "react-router-dom";
import MonitorsForm from "@app/containers/monitors/monitors-form";
import {MonitorsDetailsHOC} from "@app/containers/monitors/monitors-details";
import Breadcrumb from "@components/breadcrumb";
import {MonitorsListHOC} from "@app/containers/monitors/monitors-list";

export const MONITOR_EVENT = "monitor_event";

const Monitors: FunctionComponent = () => {
    const {path} = useRouteMatch();
    const {pathname} = useLocation();
    return (
        <Container>
            {
                pathname !== path && <Breadcrumb label="Monitors" to="/monitors"/>
            }
            <Switch>
                <Route path={path} exact>
                    <MonitorsListHOC/>
                </Route>
                <Route path={`${path}/new`}>
                    <MonitorsForm/>
                </Route>
                <Route path={`${path}/:id`}>
                    <MonitorsDetailsHOC/>
                </Route>
            </Switch>
        </Container>
    )
};

export default Monitors;
