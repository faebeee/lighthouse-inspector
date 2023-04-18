import { HistoryChart, HistoryChartProps } from './history-chart';
import { StoryFn } from '@storybook/react';
import { COLOR } from '../../config.web';


export default {
  title: 'Charts/HistoryChart',
  component: HistoryChart,
  args: {
    keys: [
      {label: 'performance', color: COLOR.PERFORMANCE},
      {label: 'accessibility', color: COLOR.ACCESSIBILITY},
      {label: 'bestPractices', color: COLOR.BEST_PRACTICE},
      {label: 'seo', color: COLOR.seo},
      {label: 'pwa', color: COLOR.pwa}
    ],
    data: [
      {
        'id': 1,
        'siteId': 7,
        'date': '2023-04-17T09:29:30.796Z',
        'finalUrl': 'https://www.keinundaber.ch/buecher',
        'performance': 89,
        'accessibility': 100,
        'bestPractices': 100,
        'seo': 90,
        'pwa': 67,
        'serverResponseTime': 1272.594,
        'tti': 586.2,
        'htmlReportFile': 'report_7_desktop_2023-04-17-112930.html',
        'type': 'desktop',
        'stacks': [],
        'is_crawlable': true
      },
      {
        'id': 1,
        'siteId': 7,
        'date': '2023-04-18T09:29:30.796Z',
        'finalUrl': 'https://www.keinundaber.ch/buecher',
        'performance': 70,
        'accessibility': 100,
        'bestPractices': 100,
        'seo': 90,
        'pwa': 67,
        'serverResponseTime': 1272.594,
        'tti': 586.2,
        'htmlReportFile': 'report_7_desktop_2023-04-17-112930.html',
        'type': 'desktop',
        'stacks': [],
        'is_crawlable': true
      },
      {
        'id': 7,
        'siteId': 7,
        'date': '2023-04-19T19:04:16.138Z',
        'finalUrl': 'https://www.keinundaber.ch/buecher',
        'performance': 89,
        'accessibility': 100,
        'bestPractices': 100,
        'seo': 90,
        'pwa': 67,
        'serverResponseTime': 1059.926,
        'tti': 640.232,
        'htmlReportFile': 'report_7_desktop_2023-04-17-210416.html',
        'type': 'desktop',
        'stacks': [],
        'is_crawlable': true
      }
    ]
  }
};

export const Default: StoryFn<HistoryChartProps> = (args) => {
  return <HistoryChart {...args} />;
};

export const Single: StoryFn<HistoryChartProps> = (args) => {
  return <HistoryChart  {...args} keys={[ {label: 'performance', color: COLOR.PERFORMANCE} ]} />;
};
