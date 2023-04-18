import { HistoryBarChart, HistoryBarChartProps } from './history-bar-chart';
import { StoryFn } from '@storybook/react';
import { COLOR } from '../../config.web';

export default {
  title: 'Charts/HistoryBarChart',
  component: HistoryBarChart,
  args: {
    width: 100,
    height: 50,
    data: [
      {
        x: new Date('2023-04-17T09:29:30.796Z'),
        y: 10,
        fill: COLOR.PERFORMANCE
      },
      {
        x: new Date('2023-04-18T09:29:30.796Z'),
        y: 50,
        fill: COLOR.PERFORMANCE
      },
      {
        x: new Date('2023-04-19T09:29:30.796Z'),
        y: 100,
        fill: COLOR.PERFORMANCE
      },
      {
        x: new Date('2023-04-20T09:29:30.796Z'),
        y: 90,
        fill: COLOR.PERFORMANCE
      },
      {
        x: new Date('2023-04-21T09:29:30.796Z'),
        y: 90,
        fill: COLOR.PERFORMANCE
      }
    ]
  }
};

export const Default: StoryFn<HistoryBarChartProps> = (args) => {
  return <HistoryBarChart {...args} />;
};
