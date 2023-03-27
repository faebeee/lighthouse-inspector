import { CronStatusIndicator } from "./cron-status-indicator";
import { RunningIndicator } from "./running-indicator";
import { ListItemText, MenuItem } from "@mui/material";
import React from "react";

export const SystemIndicators = () => {
    return <>
        <MenuItem>
            <ListItemText>
                System
            </ListItemText>
        </MenuItem>
        <CronStatusIndicator />
        <RunningIndicator />
    </>;
};
