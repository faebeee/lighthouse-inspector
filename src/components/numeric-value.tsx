import Typography, { TypographyProps } from '@mui/material/Typography'
import React, { useMemo } from 'react'
import { STATUS_COLORS } from '../../config.web'
import Box from '@mui/material/Box'

export type NumericValueProps = {
    value?: number;
    unit?: string;
    goodThreshold: number;
    poorThreshold: number;
    prefix?: string;
    reverse?: boolean;
    variant?: TypographyProps['variant'];
}
export const NumericValue = ({
                                 reverse,
                                 value = 0,
                                 variant = 'h2',
                                 unit,
                                 prefix,
                                 goodThreshold,
                                 poorThreshold
                             }: NumericValueProps) => {
    const color = useMemo(() => {
        if (reverse) {
            if (value >= goodThreshold) {
                return {
                    color: STATUS_COLORS.VERY_GOOD
                };
            }

            if (value < goodThreshold && value >= poorThreshold) {
                return {
                    color: STATUS_COLORS.MEDIUM
                };
            }

            return {color: STATUS_COLORS.POOR}
        }
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
    }, [value]);
    return <Box>
        <Typography variant={variant} color={color.color}
          noWrap={true}>{prefix} {value ? Math.round(value) : '???'}{unit}</Typography>
    </Box>;
};
