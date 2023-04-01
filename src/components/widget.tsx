import { Card, CardActions, CardContent, SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { PropsWithChildren, ReactNode } from "react";
import Box from "@mui/material/Box";

export type WidgetProps = PropsWithChildren<{
    title?: ReactNode;
    actions?: ReactNode;
    yCentered?: boolean;
    xCentered?: boolean;
    autoHeight?: boolean;
    sx?: SxProps
}>;

export const Widget = ({
                           actions,
                           autoHeight,
                           children,
                           title,
                           yCentered = true,
                           xCentered = true,
                           sx
                       }: WidgetProps) => {
    return <Card sx={ { height: autoHeight ? "100%" : "380px", ...sx } }>
        <CardContent sx={ { display: "flex", flexDirection: "column", height: "100%" } }>
            { title && <Typography color={ "textSecondary" } variant={ "h6" }>{ title }</Typography> }
            <Box sx={ {
                width: "100%",
                flex: "1 0 100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: yCentered ? "center" : "flex-start",
                alignItems: xCentered ? "center" : "flex-start"
            } }>
                { children }
            </Box>
        </CardContent>
        { actions && <CardActions>{ actions }</CardActions> }
    </Card>;
};
