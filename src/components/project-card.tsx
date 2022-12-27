import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { format } from "date-fns";
import { COLOR, DATE_FORMAT } from "../../config";
import React from "react";
import { LighthouseRunReport, Project } from "@prisma/client";
import { StatsChart } from "./stats-chart";

export type ProjectCardProps = {
    project: Project;
    report?: LighthouseRunReport | null
}
export const ProjectCard = ({ report, project }: ProjectCardProps) => {
    return <Card>
        <Stack component={ 'div' } direction={ 'row' } spacing={ 1 }>
            <CardMedia component="img"
                height={ 300 }
                style={ { objectFit: 'cover' } }
                image={ `/api/reports/${ report?.id }/thumbnail` }>
            </CardMedia>
        </Stack>
        <CardContent>
            <Stack component={ 'div' } direction={ 'row' }>
                <Link href={ `/projects/${ project.id }` }>
                    <Typography color={ 'textPrimary' } variant={ 'h5' }>{ project.name }</Typography>
                </Link>

                { project.group && <Chip color={ 'primary' } sx={ { ml: 2 } } label={ project.group }/> }

            </Stack>


            { report && <StatsChart data={ [
                { x: 'Performance', y: report.performance, fill: COLOR.PERFORMANCE },
                { x: 'Accessibility', y: report.accessibility, fill: COLOR.ACCESSIBILITY },
                { x: 'Best Practices', y: report.bestPractices, fill: COLOR.BEST_PRACTICE },
                { x: 'SEO', y: report.SEO, fill: COLOR.SEO },
                { x: 'PWA', y: report.PWA, fill: COLOR.PWA },
            ] }/> }

            { report && <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Performance</TableCell>
                            <TableCell>Accessibility</TableCell>
                            <TableCell>Best Practices</TableCell>
                            <TableCell>SEO</TableCell>
                            <TableCell>PWA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{ report.performance }</TableCell>
                            <TableCell>{ report.accessibility }</TableCell>
                            <TableCell>{ report.bestPractices }</TableCell>
                            <TableCell>{ report.SEO }</TableCell>
                            <TableCell>{ report.PWA }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> }
        </CardContent>
        <CardActions>
            { project.group && <Link href={ `/group/${ project.group }` }>
                <Button color={ 'secondary' } variant={ 'text' }>View Group</Button>
            </Link> }
            { report && <Link target={ '_blank' }
                href={ `/api/reports/${ report!.id }` }>
                <Button color={ 'secondary' } variant={ 'text' }>Open Report</Button>
            </Link> }
        </CardActions>
    </Card>;
}
