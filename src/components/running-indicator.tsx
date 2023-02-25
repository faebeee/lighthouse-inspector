import { useResource } from "../hooks/use-resource";
import { Project } from "@prisma/client";
import { Badge, ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import { useMemo } from "react";
import Link from "next/link";

export const RunningIndicator = () => {
    const api = useResource<Project[]>({ url: "/api/inspect" }, 2000);
    const projects = useMemo(() => api.data ?? [], [ api.data ]);

    return <MenuList>
        <MenuItem>
            <ListItemText>
                Running Projects
            </ListItemText>
        </MenuItem>
        { projects.length === 0 && <MenuItem>
          <ListItemText>
            No project running
          </ListItemText></MenuItem> }
        { projects.map((project) => (<Link key={ project.id } href={ `/projects/${ project.id }` }>
            <MenuItem>
                <ListItemText>
                    <Badge color="primary" variant={ "dot" }>
                        <Typography color={ "secondary" }>{ project.name }</Typography>
                    </Badge>
                </ListItemText>
            </MenuItem>
        </Link>)) }
    </MenuList>;
};
