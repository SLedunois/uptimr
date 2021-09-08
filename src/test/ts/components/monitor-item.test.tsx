import React from 'react';
import '@testing-library/jest-dom'
import MonitorItem from '@components/monitor-item';
import {render} from '@testing-library/react';
import {IMonitor} from '@app/types';

const monitor: IMonitor = {
    id: 'monitor-id',
    cron: '0 0/1 * 1/1 * ?',
    name: 'monitor-name',
    target: 'http://localhost:3000/health_check',
    owner: 'owner-id',
    status: 'SUCCESS'
}

test('MonitorItem should renders properly', () => {
    render(<MonitorItem monitor={monitor}/>);
});

test('MonitorItem should renders text content properly', () => {
    const {container} = render(<MonitorItem monitor={monitor}/>);
    expect(container.querySelector('.monitor-item .name').textContent).toEqual(monitor.name);
    expect(container.querySelector('.monitor-item .target').textContent).toEqual(`(${monitor.target})`);
});