import { useResource } from './use-resource'
import { useBeacon } from './use-beacon'
import { AUDIT_BEACON_VALUE, BEACON_KEY } from '../../config'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { DATE_FORMAT } from '../../config.web'
import { Site } from '@prisma/client'

export const useAuditRunnintState = () => {
  const api = useResource<Site[]>({url: '/api/inspect'}, 1000)
  const beacon = useBeacon<AUDIT_BEACON_VALUE>(BEACON_KEY.AUDIT, 5000)
  const auditProgress = useBeacon(BEACON_KEY.AUDIT_PROGRESS, 1000)
  const text = useMemo(() => beacon.value === AUDIT_BEACON_VALUE.running ? `Started ${(beacon.date ? format(beacon.date, DATE_FORMAT) : '?')}` : `Last run ${(beacon.date ? format(beacon.date, DATE_FORMAT) : '?')}`, [ beacon, auditProgress ])


  return {
    isRunning: (api.data?.length ?? 0) > 0,
    progress: auditProgress.value,
    status: text
  }
}
