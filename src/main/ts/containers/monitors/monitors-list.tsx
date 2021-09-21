import React, {FunctionComponent} from 'react';
import Headline from "@components/headline";
import Button from "@components/button";
import {IMonitor} from "@app/types";
import {MonitorItem} from "@components/monitor-item";
import {gql, useQuery} from "@apollo/client";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useNotify} from "@app/hooks/notify";

const FETCH_MONITORS = gql`
{
    getMonitors{
        id
        cron
        target
        name
        status
    }
}
`

const updateMonitorStatus = (notification: IMonitor, monitors: IMonitor[]) => {
    monitors.forEach(monitor => {
        if (monitor.id === notification.id) {
            monitor.status = notification.status;
        }
    })
}

const MonitorsList: FunctionComponent = () => {
    const {loading, data} = useQuery(FETCH_MONITORS, {fetchPolicy: "no-cache"});
    const history = useHistory();
    const {t} = useTranslation();
    const notification = useNotify('monitor_changes');

    if (notification && data) {
        updateMonitorStatus(notification, data.getMonitors);
    }

    if (loading) return <p>loading ...</p>
    return (
        <div>
            <div className="flex items-center justify-between">
                <Headline.Title label={t('monitors.title')}/>
                <Button.Primary label={t('monitors.create')}
                                onClick={() => history.push('/monitors/new')}/>
            </div>
            <ul>
                {
                    data.getMonitors.map((monitor: IMonitor) => <div key={monitor.id} className="mb-3">
                        <MonitorItem
                            monitor={monitor}/>
                    </div>)
                }
            </ul>
        </div>
    );
}

export default MonitorsList;