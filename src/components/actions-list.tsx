import React from "react";
import { Button, Link, Menu, MenuItem } from "@mui/material";
import { Project } from "@prisma/client";

export type ActionsListProps = {
    project: Project;
}
export const ActionsList = ({ project }: ActionsListProps) => {
    const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                onClick={ handleClick }
            >
                Actions
            </Button>
            <Menu
                anchorEl={ anchorEl }
                open={ open }
                onClose={ handleClose }
                anchorOrigin={ {
                    vertical: "top",
                    horizontal: "left"
                } }
                transformOrigin={ {
                    vertical: "top",
                    horizontal: "left"
                } }
            >
                <Link href={ `https://validator.schema.org/#url=${ project.url }` } target={ "_blank" }>
                    <MenuItem>Open in Schema markup Validator</MenuItem>
                </Link>
                <Link href={ `https://www.projectwallace.com/analyze-css?url=${ project.url }` } target={ "_blank" }>
                    <MenuItem>Open CSS Analyzer</MenuItem>
                </Link>
            </Menu>
        </div>
    );
};