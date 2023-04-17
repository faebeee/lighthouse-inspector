import { useResource } from '../hooks/use-resource';
import { Site } from '@prisma/client';
import { Badge, ListItemText, MenuItem, Tooltip, Typography } from '@mui/material';
import { useBeacon } from '../hooks/use-beacon';
import { BEACON_KEY } from '../../config';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../config.web';

export const RunningIndicator = () => {
  const api = useResource<Site[]>({url: '/api/inspect'}, 5000);
  const beacon = useBeacon(BEACON_KEY.AUDIT, 5000);

  return <MenuItem>
    <ListItemText>
      <Tooltip title={`Last run ${beacon.lastSeen ? format(beacon.lastSeen, DATE_FORMAT) : '?'}`}>
        {(api.data?.length ?? 0) > 0 ?
          (<Badge color={'success'} variant={'dot'}>
            <Typography color={'white'} variant={'body2'}>Audit running</Typography>
          </Badge>) : <Typography variant={'body2'} color={'white'}>Audit ready</Typography>}
      </Tooltip>
    </ListItemText>
  </MenuItem>;
};
