import { createContext, useContext } from 'react';
import { MetricType, ScoreType } from '../../types/app';

export type UserContextValue = {
  dashboardDetailView: ScoreType | MetricType;
  setDashboardDetailView: (score: ScoreType | MetricType) => void;
}

const noop = () => {
};

export const UserContext = createContext<UserContextValue>({
  dashboardDetailView: 'performance',
  setDashboardDetailView: noop
});

export const useUserContext = () => useContext(UserContext);
