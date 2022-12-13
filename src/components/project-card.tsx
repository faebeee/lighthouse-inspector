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
import { DATE_FORMAT } from "../../config";
import React from "react";
import { LighthouseRunReport, Project } from "@prisma/client";

export type ProjectCardProps = {
    project: Project;
    report: LighthouseRunReport
}
export const ProjectCard = ({ report, project }: ProjectCardProps) => {
    return <Card>
        <Stack component={ 'div' } direction={ 'row' } spacing={ 1 }>
            <CardMedia component="img"
                height={ 300 }
                style={ { objectFit: 'contain' } }
                image={ `/api/reports/${ report.id }/thumbnail` }>
            </CardMedia>
            <CardMedia component="img"
                height={ 300 }
                style={ { objectFit: 'contain' } }
                image={ `/api/reports/${ report.id }/thumbnail?type=mobile` }>
            </CardMedia>
        </Stack>
        <CardContent>
            <Stack component={ 'div' } direction={ 'row' }>
                <Typography variant={ 'h5' }>{ project.name }</Typography>
                { project.group && <Link href={ `/group/${ project.group }` }>
                    <Chip color={ 'primary' } sx={ { ml: 2 } } label={ project.group }/>
                </Link> }
            </Stack>

            <Typography variant={ 'body2' }>{ project.url }</Typography>
            { report?.date && <Typography
                variant={ 'body2' }>{ format(new Date(report.date), DATE_FORMAT) }</Typography> }
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
            <Link
                href={ `/projects/${ project.id }` }>
                <Button color={ 'secondary' } variant={ 'text' }>View Details</Button>
            </Link>
            { report && <Link target={ '_blank' }
                href={ `/api/reports/${ report!.id }` }>
                <Button color={ 'secondary' } variant={ 'text' }>Open Report</Button>
            </Link> }
        </CardActions>
    </Card>;
}
