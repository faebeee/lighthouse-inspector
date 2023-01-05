import { useTheme } from "@mui/material";
import React from "react";
import { VictoryBar, VictoryPolarAxis } from "victory";
import { ResponsiveVictoryChart } from "./chart";

export type StatsChartProps = {
    height?: number;
    data: { x: string, y: number, fill: string }[]
}

export const StatsChart = ({ data, height }: StatsChartProps) => {
    const theme = useTheme()
    return <ResponsiveVictoryChart polar height={ height } innerRadius={ 0 }>
        <VictoryPolarAxis
            labelPlacement="vertical"
            style={ {
                tickLabels: { fontSize: 10, fill: theme.palette.text.primary },
            } }/>

        <VictoryBar
            standalone={ false }
            data={ data }
            minDomain={ 0 }
            maxDomain={ 100 }
            style={ {
                data: {
                    // @ts-ignore
                    fill: (d) => d.data[d.index].fill, stroke: "black", strokeWidth: 2
                }
            } }
        />
    </ResponsiveVictoryChart>
}
