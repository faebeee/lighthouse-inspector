import { useResource } from "../hooks/use-resource";
import { Site } from "@prisma/client";
import { Badge, ListItemText, MenuItem, Typography } from "@mui/material";

export const RunningIndicator = () => {
    const api = useResource<Site[]>({ url: "/api/inspect" }, 5000);

    return <MenuItem>
        <ListItemText>
            { (api.data?.length ?? 0) > 0 ?
                (<Badge color={ "success" } variant={ "dot" }>
                    <Typography variant={ "body2" }>Audit running</Typography>
                </Badge>) : <Typography variant={ "body2" }>Audit ready</Typography> }
        </ListItemText>
    </MenuItem>;
};
