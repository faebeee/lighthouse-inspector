import { Badge, ListItemText, MenuItem, Tooltip, Typography } from '@mui/material'
import { useAuditRunnintState } from '../hooks/use-audit-runnint-state'

export const RunningIndicator = () => {
  const {isRunning, progress, status} = useAuditRunnintState()
  return <MenuItem>
    <ListItemText>
      <Tooltip title={status}>
        {isRunning ? (<Badge color={'success'} variant={'dot'}>
          <Typography color={'white'} variant={'body2'}>Audit: {progress}</Typography>
        </Badge>) : <Typography variant={'body2'} color={'white'}>Audit standby</Typography>}
      </Tooltip>
    </ListItemText>
  </MenuItem>;
};
