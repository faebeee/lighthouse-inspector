import { useResource } from '../hooks/use-resource';
import { Site } from '@prisma/client';
import { Badge, ListItemText, MenuItem, Tooltip, Typography } from '@mui/material';
import { useBeacon } from '../hooks/use-beacon';
import { AUDIT_BEACON_VALUE, BEACON_KEY } from '../../config';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../config.web';
import { useMemo } from 'react';

export const RunningIndicator = () => {
  const api = useResource<Site[]>({url: '/api/inspect'}, 5000);
  const beacon = useBeacon<AUDIT_BEACON_VALUE>(BEACON_KEY.AUDIT, 5000);
  const auditProgress = useBeacon(BEACON_KEY.AUDIT_PROGRESS, 5000);
  const text = useMemo(() => beacon.value ===AUDIT_BEACON_VALUE.running ? `Started ${(beacon.date ? format(beacon.date, DATE_FORMAT) : '?')}`: `Last run ${(beacon.date ? format(beacon.date, DATE_FORMAT) : '?')}`, [ beacon, auditProgress ]);

  return <MenuItem>
    <ListItemText>
      <Tooltip title={text}>
        {(api.data?.length ?? 0) > 0 ?
          (<Badge color={'success'} variant={'dot'}>
            <Typography color={'white'} variant={'body2'}>Audit: {auditProgress.value}</Typography>
          </Badge>) : <Typography variant={'body2'} color={'white'}>Audit standby</Typography>}
      </Tooltip>
    </ListItemText>
  </MenuItem>;
};
