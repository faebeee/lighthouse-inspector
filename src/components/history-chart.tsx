import { useTheme } from "@mui/material";
import { VictoryAxis, VictoryLegend, VictoryLine, VictoryTooltip } from "victory";
import { CHART_BLUR, COLOR } from "../../config.web";
import { ResponsiveVictoryChart } from "./chart";
import { format } from "date-fns";

export type HistoryChartProps = {
    keys: { label: string, color?: string }[];
    data: any[];
    hideXAxis?: boolean
}

export const HistoryChart = ({ keys, data, hideXAxis = false }: HistoryChartProps) => {
    const theme = useTheme();
    return <ResponsiveVictoryChart height={ 320 }>
        <VictoryAxis
            crossAxis
            dependentAxis
            style={ {
                tickLabels: { fontSize: 14, fill: theme.palette.text.primary }
            } }
            domain={ [ 0, 100 ] }
            standalone={ false }
        />
        {!hideXAxis && <VictoryAxis
            style={ {
                tickLabels: { fontSize: 14, fill: theme.palette.text.primary }
            } }
          scale={{ x: "time" }}
          tickCount={5}
            tickFormat={ (t) => {
                return format(new Date(t), "d.M hh:mm");
            } }
            standalone={ false }
        />}

        <VictoryLegend x={ 10 } y={ 10 }
            orientation="horizontal"
            standalone={ false }
            height={ 10 }
            style={ {
                title: { fontSize: 14 },
                labels: { fill: theme.palette.text.primary }
            } }
            colorScale={ Object.values(COLOR) }
            data={
                keys.map((key) => ({ name: key.label }))
            }
        />
        { keys.map((key, index) => (<VictoryLine
            standalone={ false }
            key={ key.label }
            minDomain={ { y: 0 } }
            maxDomain={ { y: 100 } }
            labelComponent={ <VictoryTooltip /> }
            style={ {
                data: { stroke: Object.values(COLOR)[index], filter: `blur(${ CHART_BLUR })` }
            } }
            x={ "date" }
            y={ key.label }
            data={ data }
        />)) }
        { keys.map((key, index) => (<VictoryLine
            labelComponent={ <VictoryTooltip /> }
            standalone={ false }
            key={ `chart-${ key.label }` }
            minDomain={ { y: 0 } }
            maxDomain={ { y: 100 } }
            style={ {
                data: { stroke: Object.values(COLOR)[index] }
            } }
            x={ "date" }
            y={ key.label }
            data={ data }
        />)) }
    </ResponsiveVictoryChart>;
}
