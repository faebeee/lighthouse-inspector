import { PropsWithChildren } from 'react';
import { UserContext } from './user-context';
import { useLocalStorage } from 'react-use';
import { MetricType, ScoreType } from '../../types/app';

export type UserContextProviderProps = PropsWithChildren<{}>;
export const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [ dashboardDetailView, setDashboardDetailView ] = useLocalStorage<ScoreType | MetricType>('dashboardDetailView', 'performance');


  return <UserContext.Provider value={{
    dashboardDetailView: dashboardDetailView ?? 'performance',
    setDashboardDetailView: (v) => setDashboardDetailView(v)
  }}>
    {children}
  </UserContext.Provider>;
};
