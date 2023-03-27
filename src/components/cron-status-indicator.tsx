import { useResource } from "../hooks/use-resource";
import { CronStatusApiResponse } from "../../pages/api/meta/cron-status";
import { Badge, ListItemText, MenuItem, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../config.web";

export const CronStatusIndicator = () => {
    const conStatusApi = useResource<CronStatusApiResponse>({ url: "/api/meta/cron-status" }, 5000);

    return (
        <Tooltip
            title={ `Last seen ${ conStatusApi.data ? format(new Date(conStatusApi.data?.lastSeen), DATE_FORMAT) : "???" }` }>
            <MenuItem >
                <ListItemText>
                    <Badge color={ conStatusApi.data?.online ? "success" : "warning" } variant={ "dot" }>
                        <Typography
                            variant={ "body2" }>Cron { conStatusApi.data?.online ? "online" : "offline" }</Typography>
                    </Badge>
                </ListItemText>
            </MenuItem>
        </Tooltip>);
};
