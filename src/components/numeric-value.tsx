import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import { CHART_BLUR, STATUS_COLORS } from "../../config";
import Box from "@mui/material/Box";

export type NumericValueProps = {
    value?: number;
    unit?: string;
    goodThreshold: number;
    poorThreshold: number;
}
export const NumericValue = ({ value = 0, unit, goodThreshold, poorThreshold }: NumericValueProps) => {
    const color = useMemo(() => {
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
            color: STATUS_COLORS.MEDIUM
        };
    }, []);
    return <Box>
        <Typography variant={ "h2" } color={ color.color } sx={ {  position: 'absolute', filter: `blur(${ CHART_BLUR })` } }
            noWrap={ true }>{ value ? Math.round(value) : "???" }{ unit }</Typography>
        <Typography variant={ "h2" } color={ color.color }
            noWrap={ true }>{ value ? Math.round(value) : "???" }{ unit }</Typography>
    </Box>;
};
