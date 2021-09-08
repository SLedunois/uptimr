import React, {FunctionComponent} from 'react';

export type IStatus = {
    className?: string
    status: 'WAITING' | 'SUCCESS' | 'ERROR'
}

const STATUS_COLOR = {
    'WAITING': 'blue',
    'SUCCESS': 'green',
    'ERROR': 'red'
}

export const Status: FunctionComponent<IStatus> = ({status, className}) => (
    <div className={`h-4 w-4 flex relative ${className} status`}>
        <div
            className={`animate-ping bg-${STATUS_COLOR[status]}-100 inline-flex h-full w-full rounded-full absolute opacity-75`}>&nbsp;</div>
        <div className={`relative inline-flex rounded-full h-4 w-4 bg-${STATUS_COLOR[status]}-100`}>&nbsp;</div>
    </div>
)

export default Status;