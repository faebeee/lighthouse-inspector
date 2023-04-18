import { MetricType } from '../../types/app';

const metrics: MetricType[] = [ 'tti', 'serverResponseTime' ];
export const isMetricType = (val: string) => {
  return metrics.includes(val as MetricType);
};
