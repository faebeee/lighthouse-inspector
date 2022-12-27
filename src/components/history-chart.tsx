import { VictoryAxis, VictoryLegend, VictoryLine } from "victory";
import { COLOR } from "../../config";
import { ResponsiveVictoryChart } from "./chart";

const CHART_WIDTH = 600;
const CHART_HEIGHT = 400;

export type StatsChartProps = {
    keys: { label: string, color?: string }[];
    data: any[];
}

export const HistoryChart = ({ keys, data }: StatsChartProps) => {
    return <ResponsiveVictoryChart innerRadius={50}>
        <VictoryAxis
            crossAxis
            dependentAxis
            style={ {
                tickLabels: { fontSize: 14, fill: 'white' },
            } }
            domain={ [ 0, 100 ] }
            standalone={ false }
        />

        <VictoryLegend x={ 10 } y={ 10 }
            orientation="horizontal"
            standalone={ false }
            height={ 10 }
            style={ {
                title: { fontSize: 14 },
                labels: { fill: 'white' }
            } }
            colorScale={ Object.values(COLOR) }
            data={
                keys.map((key) => ({ name: key.label }))
            }
        />
        { keys.map((key) => (<VictoryLine
            standalone={ false }
            key={ key.label }
            minDomain={ { y: 0 } }
            maxDomain={ { y: 100 } }
            style={ {
                data: { stroke: key.color },
            } }
            x={ 'date' }
            y={ key.label }
            data={ data }
        />)) }
    </ResponsiveVictoryChart>
}
