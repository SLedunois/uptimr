import React from 'react';
import {buildChartTheme} from '@visx/xychart';
import {gql, useQuery} from "@apollo/client";
import {IChartDateValue} from "@app/types";
import {max} from "d3-array";
import Chart, {ILineCharSettings} from '@components/chart';


// data accessors
const getX = (d: IChartDateValue) => d.date;
const getY = (d: IChartDateValue) => d.value;

export type MonitorsResponseTimeChartProps = {
    width: number;
    height: number;
    monitorID: string;
    date: Date
};

const FETCH_MONITOR_CHART_DATA = gql`
query getMetrics($monitorID: String, $start: DateTime, $end: DateTime) {
    getMetrics(monitorID: $monitorID, start: $start, end: $end) {
        bucket
        average
    }
}
`

const get2DigitNumber = (value: number): string => ("0" + value).slice(-2);

const getDates = (date: Date): { start: string, end: string } => {
    const start = date;
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    end.setHours(0, 0, 0, 0);

    return {
        start: `${start.getFullYear()}-${start.getMonth() + 1}-${get2DigitNumber(start.getDate())}T${get2DigitNumber(start.getHours())}:${get2DigitNumber(start.getMinutes())}:${get2DigitNumber(start.getSeconds())}`,
        end: `${end.getFullYear()}-${end.getMonth() + 1}-${get2DigitNumber(end.getDate())}T${get2DigitNumber(end.getHours())}:${get2DigitNumber(end.getMinutes())}:${get2DigitNumber(end.getSeconds())}`
    }
}

const theme = buildChartTheme({
    colors: ["#544AC4"],
    backgroundColor: "544AC4",
    gridColor: "#A4A4A4",
    gridColorDark: "#A4A4A4",
    tickLength: 1
});

export default function MonitorsResponseTimeChart({width, height, monitorID, date}: MonitorsResponseTimeChartProps) {
    const {start, end} = getDates(date);
    const {loading, data} = useQuery(FETCH_MONITOR_CHART_DATA, {variables: {monitorID, start, end}});

    if (loading) {
        return <div>Loading...</div>
    }

    if (!data.getMetrics) {
        return <div>"No data available"</div>;
    }

    const metrics: { bucket: string, average: number }[] = data.getMetrics;
    const series: IChartDateValue[] = Array.from(metrics).map(d => ({date: new Date(d.bucket), value: d.average}));

    const gradientID = (): string => `gradient-response-${monitorID}`;

    const settings: ILineCharSettings = {
        xScale: {type: 'time'},
        yScale: {type: 'linear', domain: [0, max(series, getY) + 25]},
        theme,
        showTooltip: true,
        renderTooltip: ({tooltipData}) => (
            <div>
                {(tooltipData.nearestDatum.datum as any).value} ms
            </div>
        ),
        series: {
            key: 'Response time',
            values: series,
            xAccessor: getX,
            yAccessor: getY
        }
    }

    return (
        <Chart.LineChart width={width} height={height} id={gradientID()} settings={settings}/>
    );
}
