import React from 'react';
import { AnimatedAxis, AreaSeries, buildChartTheme, Tooltip, XYChart } from '@visx/xychart';
import { gql, useQuery } from "@apollo/client";

import UI from '@app/components/ui';
import { IChartDateValue } from "@app/types";
import { max } from "d3-array";
import { LinearGradient } from "@visx/gradient";
import Chart, { ILineCharSettings } from '@components/chart';
import { curveCatmullRom as Curve } from '@visx/curve';


// data accessors
const getX = (d: IChartDateValue) => d.date;
const getY = (d: IChartDateValue) => d.value;

export type CurveProps = {
    width: number;
    height: number;
    monitorID: string;
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

const getDates = (): { start: string, end: string } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return {
        start: `${today.getFullYear()}-${today.getMonth() + 1}-${get2DigitNumber(today.getDate())}T${get2DigitNumber(today.getHours())}:${get2DigitNumber(today.getMinutes())}:${get2DigitNumber(today.getSeconds())}`,
        end: `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${get2DigitNumber(tomorrow.getDate())}T${get2DigitNumber(tomorrow.getHours())}:${get2DigitNumber(tomorrow.getMinutes())}:${get2DigitNumber(tomorrow.getSeconds())}`
    }
}

const theme = buildChartTheme({
    colors: ["#544AC4"],
    backgroundColor: "544AC4",
    gridColor: "#A4A4A4",
    gridColorDark: "#A4A4A4",
    tickLength: 1
});

export default function MonitorsResponseTimeChart({ width, height, monitorID }: CurveProps) {
    const { start, end } = getDates();
    const { loading, data } = useQuery(FETCH_MONITOR_CHART_DATA, { variables: { monitorID, start, end } });

    if (loading) {
        return <div>Loading...</div>
    }

    if (!data.getMetrics) {
        return <div>"No data available"</div>;
    }

    const metrics: { bucket: string, average: number }[] = data.getMetrics;
    const series: IChartDateValue[] = Array.from(metrics).map(d => ({ date: new Date(d.bucket), value: d.average }));

    const gradientID = (): string => `gradient-response-${monitorID}`;

    const settings: ILineCharSettings = {
        xScale: { type: 'time' },
        yScale: { type: 'linear', domain: [0, max(series, getY) + 25] },
        theme,
        showTooltip: true,
        renderTooltip: ({ tooltipData }) => (
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
        <UI.Shadow>
            <Chart.LineChart width={width} height={height} id={gradientID()} settings={settings} />
        </UI.Shadow>
    );
}
