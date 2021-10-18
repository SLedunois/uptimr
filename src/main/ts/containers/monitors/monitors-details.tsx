import React, {FunctionComponent, useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ParentSize} from "@visx/responsive";
import {SingleDatePicker} from 'react-dates';
import moment, {Moment} from 'moment';
import Status from "@components/status";
import Title from "@components/title";
import Counter from "@components/counter";
import Card from "@components/card";
import {useNotify, withNotify} from "@app/hooks/notify";
import MonitorsResponseTimeChart from "@app/containers/monitors/monitors-response-time-chart";

import {IMonitor} from "@app/types";

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
    const [chartDate, setChartDate] = useState<Moment>(moment());
    const [datePickerFocused, setDatePickerFocused] = useState<boolean>(false);
    const notification: IMonitor = useNotify(DETAIL_MONITOR_EVENT);


    if (loading) {
        return <div>Loading...</div>
    }

    const monitor: IMonitor = notification || data.getMonitor;

    if (!monitor) {
        return <div>Error :(</div>
    }

    const chartDateFilter = <SingleDatePicker date={chartDate}
                                              onDateChange={date => setChartDate(date)}
                                              focused={datePickerFocused}
                                              onFocusChange={({focused}) => setDatePickerFocused(focused)}
                                              id="day-response-time-picker"
                                              numberOfMonths={1}
                                              noBorder
                                              small
                                              isOutsideRange={(day) => !(day.isBefore(moment(), 'days') || day.isSame(moment(), 'days'))}/>

    return (
        <div>
            <div className="flex flex-row justify-items items-center">
                <div className="mr-4">
                    <Status status={monitor.status}/>
                </div>
                <Title.H1 label={monitor.name}/>
            </div>
            <div className="flex">
                <Card className="w-1/3 p-8 mr-8" title={t('monitors.currently_uptime')}>
                    <Counter date={monitor.uptime}/>
                </Card>
                <Card className="w-1/3 p-8" title={t('monitors.last_check')}>
                    <Counter date={monitor.lastCheck}/>
                </Card>
            </div>
            <Card className="h-96 mt-8 p-8" title={"Response time over the day"} filter={chartDateFilter}>
                <ParentSize>
                    {({width, height}) => <MonitorsResponseTimeChart height={height} width={width} monitorID={id}
                                                                     date={chartDate.toDate()}/>}
                </ParentSize>
            </Card>
        </div>
    )
}

export const MonitorsDetailsHOC = () => {
    const {id} = useParams<{ id: string }>();
    const HOC = withNotify(`/subscribers/monitors/${id}`, DETAIL_MONITOR_EVENT, MonitorsDetails);
    return <HOC/>
}

export default MonitorsDetails;