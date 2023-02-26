import { Card, CardActions, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { PropsWithChildren, ReactNode } from "react";
import Box from "@mui/material/Box";

export type WidgetProps = PropsWithChildren<{
    title: string;
    actions?: ReactNode
}>;

export const Widget = ({ actions, children, title }: WidgetProps) => {
    return <Card sx={ { height: "380px" } }>
        <CardContent sx={ { display: "flex", flexDirection: "column", height: "100%" } }>
            <Typography color={ "textSecondary" } variant={ "h6" }>{ title }</Typography>
            <Box sx={ {
                width: '100%',
                flex: "1 0 100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            } }>
                { children }
            </Box>
        </CardContent>
        { actions && <CardActions>{ actions }</CardActions> }
    </Card>;
};
