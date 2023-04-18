import { StatsChart, StatsChartProps } from './stats-chart';
import { COLOR } from '../../config.web';
import { StoryFn } from '@storybook/react';

export default {
  title: 'Charts / StatsChart',
  component: StatsChart,
  args: {
    height: 350,
    data: [
      {
        x: 'Performance',
        y: 10,
        fill: COLOR.PERFORMANCE
      },
      {
        x: 'Accessibility',
        y: 20,
        fill: COLOR.ACCESSIBILITY
      },
      {
        x: 'Best Practices',
        y: 30,
        fill: COLOR.BEST_PRACTICE
      },
      {
        x: 'seo',
        y: 40,
        fill: COLOR.seo
      },
      {
        x: 'pwa',
        y: 50,
        fill: COLOR.pwa
      }
    ]
  }
};

export const Default: StoryFn<StatsChartProps> = (args) => {
  return <StatsChart {...args} />;
};
