import { CronStatusIndicator } from "./cron-status-indicator";
import { RunningIndicator } from "./running-indicator";
import { ListItemText, MenuItem, Typography } from '@mui/material';
import React from "react";

export const SystemIndicators = () => {
    return <>
        <MenuItem>
            <ListItemText>
                <Typography color={'white'}>
                    System
                </Typography>
            </ListItemText>
        </MenuItem>
        <CronStatusIndicator />
        <RunningIndicator />
    </>;
};
