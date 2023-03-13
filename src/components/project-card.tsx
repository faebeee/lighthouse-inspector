import { Button, Card, CardActions, CardContent, CardMedia, Chip } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { LighthouseRunReport, Project, Tag } from "@prisma/client";
import { useResource } from "../hooks/use-resource";
import { ProjectResultHistoryChart } from "./project-result-history-chart";
import { AUDIT_HISTORY_CHART_LINES } from "../../config";

export type ProjectCardProps = {
    project: Project;
    report?: LighthouseRunReport | null
}
export const ProjectCard = ({ report, project }: ProjectCardProps) => {
    const tagsApi = useResource<Tag[]>({ url: `/api/projects/${ project.id }/tags` });

    return <Card sx={ { background: project.is_running ? "#555" : undefined } }>
        <Stack component={ "div" } direction={ "row" } spacing={ 1 }>
            <CardMedia component="img"
                height={ 300 }
                style={ { objectFit: "cover" } }
                image={ `/api/reports/${ report?.id }/thumbnail` }>
            </CardMedia>
        </Stack>
        <CardContent>
            <Stack component={ "div" } direction={ "row" } alignItems={ "center" }>
                <Link href={ `/projects/${ project.id }` }>
                    <Typography color={ "textPrimary" } variant={ "h5" }>{ project.name }</Typography>
                </Link>

                { project.is_running && <Typography sx={ { ml: 2 } } variant={ "body2" }>Running...</Typography> }
            </Stack>

            <Stack spacing={ 1 } direction={ "row" } py={ 2 }>
                { project.group && <Chip label={ project.group } /> }
                { tagsApi.data?.map((tag: Tag) => <Chip label={ tag.name } key={ tag.id } />) }
            </Stack>


            <ProjectResultHistoryChart lines={ AUDIT_HISTORY_CHART_LINES } project={ project } />
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
