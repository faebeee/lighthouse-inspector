import { useResource } from "../hooks/use-resource";
import { Site } from "@prisma/client";
import { Badge, ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import { useMemo } from "react";
import Link from "next/link";

export const RunningIndicator = () => {
    const api = useResource<Site[]>({ url: "/api/inspect" }, 2000);
    const sites = useMemo(() => api.data ?? [], [ api.data ]);

    return <MenuList>
        <MenuItem>
            <ListItemText>
                Running Projects
            </ListItemText>
        </MenuItem>
        { sites.length === 0 && <MenuItem>
          <ListItemText>
            No project running
          </ListItemText></MenuItem> }
        { sites.map((site) => (<Link key={ site.id } href={ `/projects/${ site.projectId }/sites/${ site.id }` }>
            <MenuItem>
                <ListItemText>
                    <Badge color="primary" variant={ "dot" }>
                        <Typography color={ "secondary" }>{ site.name }</Typography>
                    </Badge>
                </ListItemText>
            </MenuItem>
        </Link>)) }
    </MenuList>;
};
