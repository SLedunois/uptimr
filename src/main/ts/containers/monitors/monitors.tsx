import React, {FunctionComponent} from 'react';
import {Container} from "@components/container";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import MonitorsList from "@app/containers/monitors/monitors-list";
import MonitorsForm from "@app/containers/monitors/monitors-form";
import {withNotify} from "@app/hooks/notify";

const MonitorsListHOC = withNotify('/subscribers/monitors/status', 'monitor_changes', MonitorsList);

const Monitors: FunctionComponent = () => {
    const {path} = useRouteMatch();
    return (
        <Container>
            <Switch>
                <Route path={path} exact>
                    <MonitorsListHOC/>
                </Route>
                <Route path={`${path}/new`}>
                    <MonitorsForm/>
                </Route>
            </Switch>
        </Container>
    )
};

export default Monitors;
