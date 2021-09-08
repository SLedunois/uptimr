import React, {FunctionComponent} from 'react'
import {IMonitor} from "@app/types";
import {Status} from "@components/status";
import UI from "@components/ui";

export type IMonitorItem = {
    monitor: IMonitor
}

export const MonitorItem: FunctionComponent<IMonitorItem> = ({monitor}) => (
    <UI.Shadow>
        <div className="p-4 flex items-center monitor-item">
            <Status status={monitor.status} className="mx-4"/>
            <span className="ml-4 font-bold name">{monitor.name}</span>
            <span className="text-sm ml-4 target">({monitor.target})</span>
        </div>
    </UI.Shadow>
)

export default MonitorItem;