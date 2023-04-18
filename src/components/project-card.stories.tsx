import { ProjectCard, ProjectCardProps } from './project-card';
import { StoryFn } from '@storybook/react';

export default {
  title: 'Components / ProjectCard',
  component: ProjectCard,
  parameters: {
    mockData: [
      {
        url: '/api/projects/9/sites/14/reports?type=desktop&limit=5',
        method: 'GET',
        status: 200,
        response: [
          {
            'id': 33,
            'siteId': 14,
            'date': '2023-04-17T19:13:37.937Z',
            'finalUrl': 'https://www.sib.ch/',
            'performance': 88,
            'accessibility': 94,
            'bestPractices': 92,
            'seo': 100,
            'pwa': 33,
            'serverResponseTime': 70.987,
            'tti': 836.7224999999999,
            'htmlReportFile': 'report_14_desktop_2023-04-17-211337.html',
            'type': 'desktop',
            'stacks': [],
            'is_crawlable': true
          },
          {
            'id': 34,
            'siteId': 14,
            'date': '2023-04-18T19:13:37.937Z',
            'finalUrl': 'https://www.sib.ch/',
            'performance': 88,
            'accessibility': 94,
            'bestPractices': 92,
            'seo': 100,
            'pwa': 33,
            'serverResponseTime': 70.987,
            'tti': 836.7224999999999,
            'htmlReportFile': 'report_14_desktop_2023-04-17-211337.html',
            'type': 'desktop',
            'stacks': [],
            'is_crawlable': true
          },
          {
            'id': 35,
            'siteId': 14,
            'date': '2023-04-19T19:13:37.937Z',
            'finalUrl': 'https://www.sib.ch/',
            'performance': 88,
            'accessibility': 94,
            'bestPractices': 92,
            'seo': 100,
            'pwa': 33,
            'serverResponseTime': 70.987,
            'tti': 836.7224999999999,
            'htmlReportFile': 'report_14_desktop_2023-04-17-211337.html',
            'type': 'desktop',
            'stacks': [],
            'is_crawlable': true
          },
        ]
      },

      {
        url: '/api/projects/9',
        method: 'GET',
        status: 200,
        response: {'id': 9, 'name': 'SIB', 'repoUrl': null, 'interval_reporting': true}
      }
    ]
  },
  args: {
    report: {
      'id': 33,
      'siteId': 14,
      'date': '2023-04-17T19:13:37.937Z',
      'finalUrl': 'https://www.sib.ch/',
      'performance': 88,
      'accessibility': 94,
      'bestPractices': 92,
      'seo': 100,
      'pwa': 33,
      'serverResponseTime': 70.987,
      'tti': 836.7224999999999,
      'htmlReportFile': 'report_14_desktop_2023-04-17-211337.html',
      'type': 'desktop',
      'stacks': [],
      'is_crawlable': true
    },
    site: {
      'id': 14,
      'name': 'Home',
      'projectId': 9,
      'url': 'https://www.sib.ch/',
      'is_running': false,
      'share_token': null
    }
  }
};

export const Default: StoryFn<ProjectCardProps> = (args) => {
  return <ProjectCard {...args} />;
};
