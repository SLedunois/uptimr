import React, {FunctionComponent} from 'react';
import {IncidentsIcon, MonitorIcon, PingIcon} from '../icons'

type IBadge = {
    color: string,
    className?: string
}

export const Badge: FunctionComponent<IBadge> = ({color, children, className}) => (
    <div
        className={`bg-${color}-100 w-10 h-10 rounded-2xl flex items-center justify-center  text-${color}-40 text-lg ${className || ''}`}>{children}</div>
)

export const MonitorBadge: FunctionComponent = () => <Badge color="blue"><MonitorIcon/></Badge>

export const HeartbeatsBadge: FunctionComponent = () => <Badge color="purple"><PingIcon/></Badge>

export const IncidentsBadge: FunctionComponent = () => <Badge color="orange"><IncidentsIcon/></Badge>

export default Badge;
