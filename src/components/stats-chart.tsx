import { useTheme } from "@mui/material";
import React from "react";
import { VictoryAxis, VictoryBar, VictoryPolarAxis } from "victory";
import { ResponsiveVictoryChart } from "./chart";

export type StatsChartProps = {
    height?: number;
    data: { x: string, y: number, fill: string }[]
}

export const StatsChart = ({ data, height }: StatsChartProps) => {
    const theme = useTheme()
    return <ResponsiveVictoryChart height={ height }>
        <VictoryAxis
            style={ {
                tickLabels: { fontSize: 12, fill: theme.palette.text.primary },
            } }/>

        <VictoryBar
            standalone={ false }
            data={ data }
            minDomain={ 0 }
            maxDomain={ 100 }
            style={ {
                data: {
                    // @ts-ignore
                    fill: (d) => d.data[d.index].fill
                }
            } }
        />
    </ResponsiveVictoryChart>
}
