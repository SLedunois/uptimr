import React, {FunctionComponent} from 'react';
import {gql, useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";

import {IMonitor} from "@app/types";

import Status from "@components/status";
import Headline from "@components/headline";
import Counter from "@components/counter";
import {useTranslation} from "react-i18next";
import Card from "@components/card";
import {useNotify, withNotify} from "@app/hooks/notify";
import MonitorsResponseTimeChart from "@app/containers/monitors/monitors-response-time-chart";
import {ParentSize} from "@visx/responsive";

const DETAIL_MONITOR_EVENT = "DETAIL_MONITOR_EVENT";

const FETCH_MONITOR = gql`
query getMonitor($id: String) {
    getMonitor(id: $id) {
        id
        name
        target
        status
        uptime
        lastCheck
    }
}
`

const MonitorsDetails: FunctionComponent = () => {
    const {id} = useParams<{ id: string }>();
    const {t} = useTranslation();
    const {loading, data} = useQuery(FETCH_MONITOR, {variables: {id}});
    const notification: IMonitor = useNotify(DETAIL_MONITOR_EVENT);


    if (loading) {
        return <div>Loading...</div>
    }

    const monitor: IMonitor = notification || data.getMonitor;

    if (!monitor) {
        return <div>Error :(</div>
    }

    return (
        <div>
            <div className="flex flex-row justify-items items-center">
                <div className="mr-4">
                    <Status status={monitor.status}/>
                </div>
                <Headline.Title label={monitor.name}/>
            </div>
            <div className="flex">
                <Card className="w-1/3 p-8 mr-8" title={t('monitors.currently_uptime')}>
                    <Counter date={monitor.uptime}/>
                </Card>
                <Card className="w-1/3 p-8" title={t('monitors.last_check')}>
                    <Counter date={monitor.lastCheck}/>
                </Card>
            </div>
            <div className="mt-8 h-96">
                <ParentSize>
                    {({width, height}) => <MonitorsResponseTimeChart height={height} width={width} monitorID={id}/>}
                </ParentSize>
            </div>
        </div>
    )
}

export const MonitorsDetailsHOC = () => {
    const {id} = useParams<{ id: string }>();
    const HOC = withNotify(`/subscribers/monitors/${id}`, DETAIL_MONITOR_EVENT, MonitorsDetails);
    return <HOC/>
}

export default MonitorsDetails;