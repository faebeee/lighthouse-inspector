import { useResource } from "../hooks/use-resource";
import { CronStatusApiResponse } from "../../pages/api/meta/cron-status";
import { Badge, ListItemText, MenuItem, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../config.web";
import { useBeacon } from "../hooks/use-beacon";
import { BEACON_KEY } from "../../config";

export const CronStatusIndicator = () => {
    const conStatusApi = useResource<CronStatusApiResponse>({ url: "/api/meta/cron-status" }, 5000);
    const beacon = useBeacon(BEACON_KEY.CRON, 5000);

    return (
        <Tooltip
            title={ `Last seen ${ beacon.lastSeen ? format(new Date(beacon.lastSeen), DATE_FORMAT) : "???" }` }>
            <MenuItem>
                <ListItemText>
                    <Badge color={ conStatusApi.data?.online ? "success" : "warning" } variant={ "dot" }>
                        <Typography
                            variant={ "body2" }>Cron { conStatusApi.data?.online ? "online" : "offline" }</Typography>
                    </Badge>
                </ListItemText>
            </MenuItem>
        </Tooltip>);
};
