import Typography, { TypographyProps } from "@mui/material/Typography";
import React, { useMemo } from "react";
import { CHART_BLUR, STATUS_COLORS } from "../../config";
import Box from "@mui/material/Box";

export type NumericValueProps = {
    value?: number;
    unit?: string;
    goodThreshold: number;
    poorThreshold: number;
    variant?: TypographyProps["variant"];
}
export const NumericValue = ({ value = 0, variant = "h2", unit, goodThreshold, poorThreshold }: NumericValueProps) => {
    const color = useMemo(() => {
        if (value >= goodThreshold && value <= poorThreshold) {
            return {
                color: STATUS_COLORS.MEDIUM
            };
        }
        if (value <= goodThreshold) {
            return {
                color: STATUS_COLORS.VERY_GOOD
            };
        }
        if (value >= poorThreshold) {
            return {
                color: STATUS_COLORS.POOR
            };
        }

        return {
            color: STATUS_COLORS.POOR
        };
    }, [value])
    ;
    return <Box>
        <Typography variant={ variant } color={ color.color }
            sx={ { position: "absolute", filter: `blur(${ CHART_BLUR })` } }
            noWrap={ true }>{ value ? Math.round(value) : "???" }{ unit }</Typography>
        <Typography variant={ variant } color={ color.color }
            noWrap={ true }>{ value ? Math.round(value) : "???" }{ unit }</Typography>
    </Box>;
};
