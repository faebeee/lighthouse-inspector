import { useSize } from "../hooks/use-size";
import { PropsWithChildren, useRef } from "react";
import { VictoryChart, VictoryChartProps } from "victory";

export function ResponsiveVictoryChart({ ...props }: PropsWithChildren<VictoryChartProps>) {
    const ref = useRef<HTMLDivElement>(null);
    // @ts-ignore
    const { width, height } = useSize(ref.current);
    const p = {
        ...props,
        width,
    };


    return (
        <div className="chart" ref={ ref } style={ { width: "100%" } }>
            { width && <VictoryChart { ...p } /> }
        </div>
    );
}
