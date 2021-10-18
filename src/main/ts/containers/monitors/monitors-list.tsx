import React, {FunctionComponent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Title from "@components/title";
import Button from "@components/button";
import {IMonitor} from "@app/types";
import {MonitorItem} from "@components/monitor-item";
import {gql, useQuery} from "@apollo/client";
import {useTranslation} from "react-i18next";
import {useNotify, withNotify} from "@app/hooks/notify";

const LIST_MONITOR_EVENT = "LIST_MONITOR_EVENT";

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
    const {loading, data} = useQuery(FETCH_MONITORS);
    const history = useHistory();
    const {t} = useTranslation();
    const notification = useNotify(LIST_MONITOR_EVENT);

    if (notification && data) {
        updateMonitorStatus(notification, data.getMonitors);
    }

    if (loading) return <p>loading ...</p>
    return (
        <div>
            <div className="flex items-center justify-between">
                <Title.H1 label={t('monitors.title')}/>
                <Button.Primary label={t('monitors.create')}
                                onClick={() => history.push('/monitors/new')}/>
            </div>
            <ul>
                {
                    data.getMonitors.map((monitor: IMonitor) => <Link key={monitor.id} to={`/monitors/${monitor.id}`}>
                        <div className="mb-3">
                            <MonitorItem
                                monitor={monitor}/>
                        </div>
                    </Link>)
                }
            </ul>
        </div>
    );
}

export const MonitorsListHOC = withNotify('/subscribers/monitors', LIST_MONITOR_EVENT, MonitorsList);

export default MonitorsList;