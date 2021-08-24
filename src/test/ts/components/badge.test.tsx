import React from 'react';
import {render} from "@testing-library/react";
import Badge, {HeartbeatsBadge, IncidentsBadge, MonitorBadge} from "@components/badge";
import {MonitorIcon} from "@app/icons";

test('Badge should renders properly', () => {
    render(<Badge color="blue"><MonitorIcon/></Badge>)
});

test('MonitorBadge should render with blue color', () => {
    const {container} = render(<MonitorBadge/>);
    expect(container.querySelector("div").classList.contains("bg-blue-100")).toBeTruthy();
});

test('MonitorBadge should renders with blue color', () => {
    const {container} = render(<MonitorBadge/>);
    expect(container.querySelector("div").classList.contains("bg-blue-100")).toBeTruthy();
});

test('HeartbeatsBadge should renders with purple color', () => {
    const {container} = render(<HeartbeatsBadge/>);
    expect(container.querySelector("div").classList.contains("bg-purple-100")).toBeTruthy();
});

test('IncidentsBadge should renders with orange color', () => {
    const {container} = render(<IncidentsBadge/>);
    expect(container.querySelector("div").classList.contains("bg-orange-100")).toBeTruthy();
});