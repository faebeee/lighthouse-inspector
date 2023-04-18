import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';

export type HistoryBarChartEntry = {
  x: Date, y: number, fill?: string
}
export type HistoryBarChartProps = {
  width: number;
  height: number;
  data: HistoryBarChartEntry[]
  maxY?: number;
}

const getX = (d: HistoryBarChartEntry) => d.x;

export const HistoryBarChart = ({data, width, height, maxY}: HistoryBarChartProps) => {
  const theme = useTheme();
  const xMax = width;
  const yMax = height;

  const xScale = useMemo(
    () =>
      scaleBand<Date>({
        range: [ 0, xMax ],
        reverse: true,
        domain: data.map(getX)
      }),
    [ xMax ]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [ 0, yMax ],
        domain: [ 0, maxY ?? 100 ]
      }),
    [ yMax, maxY ]
  );

  return <svg width={width} height={height}>
    <Group>
      {data.map((d) => {
        const barHeight = yScale(d.y) ?? 0;
        const barX = xScale(getX(d));
        return (<>
            <Bar
              key={`bar-${d.x}-2`}
              x={barX}
              y={0}
              width={10}
              height={height}
              rx={4}
              fill={'rgba(0, 0, 0, 0.05)'}
            />
            <Bar
              key={`bar-${d.x}`}
              x={barX}
              y={height - barHeight}
              width={10}
              height={barHeight}
              rx={2}
              fill={d.fill ?? 'black'}
            />
          </>
        );
      })}
    </Group>
  </svg>;
};

export default HistoryBarChart;
