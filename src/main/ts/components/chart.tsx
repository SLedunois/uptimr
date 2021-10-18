import React, {FunctionComponent} from 'react';
import {LinearGradient} from '@visx/gradient';
import {AnimatedAxis, AreaSeries, Tooltip, XYChart, XYChartTheme} from '@visx/xychart';
import {curveCatmullRom as Curve} from '@visx/curve';
import {BandScaleConfig, D3Scale, ScaleConfig, ScaleInput} from '@visx/scale';
import {DatumObject} from '@visx/shape/lib/types';
import {RenderTooltipParams} from '@visx/xychart/lib/components/Tooltip';
import {AxisScaleOutput} from '@visx/axis';

import {IChartDateValue} from '@app/types';

type IScaleType =
    "linear"
    | "log"
    | "pow"
    | "sqrt"
    | "symlog"
    | "radial"
    | "time"
    | "utc"
    | "quantile"
    | "quantize"
    | "threshold"
    | "ordinal"
    | "point"
    | "band";

export type ILineChartSeries = {
    key: string
    values: IChartDateValue[]
    xAccessor: (d: DatumObject) => ScaleInput<D3Scale>
    yAccessor: (d: DatumObject) => ScaleInput<D3Scale>
}

export type ILineCharSettings = {
    xScale: { type: IScaleType }
    yScale: { type: IScaleType, domain: number[] }
    theme: XYChartTheme
    showTooltip: boolean
    renderTooltip?: (params: RenderTooltipParams<DatumObject>) => React.ReactNode;
    series: ILineChartSeries

}

export type ILineChart = {
    width: number
    height: number
    settings: ILineCharSettings
    id: any
    className?: string
}

const LineChart: FunctionComponent<ILineChart> = ({id, width, height, settings, className = ''}) => (
    <div className={`visx-curves ${className}`}>
        <XYChart height={height} width={width} xScale={settings.xScale as ScaleConfig<AxisScaleOutput>}
                 theme={settings.theme}
                 yScale={settings.yScale as BandScaleConfig<AxisScaleOutput>}>
            <LinearGradient id={id} from="#DCDAF3" to="#FFFFFF"/>
            <AnimatedAxis orientation="bottom"/>
            <AnimatedAxis orientation="left"/>
            <AreaSeries
                dataKey={settings.series.key}
                data={settings.series.values}
                xAccessor={settings.series.xAccessor}
                yAccessor={settings.series.yAccessor}
                curve={Curve}
                fill={`url(#${id})`}/>
            {
                settings.showTooltip && <Tooltip
                    showSeriesGlyphs
                    renderTooltip={settings.renderTooltip}/>
            }
        </XYChart>
    </div>
)

const Chart = {
    LineChart
}

export default Chart;