import { Button, Card, CardActions, CardContent, CardMedia, Chip } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { LighthouseRunReport, Project, Site, Tag } from "@prisma/client";
import { useResource } from "../hooks/use-resource";
import { ProjectResultHistoryChart } from "./project-result-history-chart";
import { AUDIT_HISTORY_CHART_LINES } from "../../config";

export type ProjectCardProps = {
    site: Site;
    report?: LighthouseRunReport | null
}
export const ProjectCard = ({ report, site }: ProjectCardProps) => {
    const tagsApi = useResource<Tag[]>({ url: `/api/projects/${ site.projectId }/sites/${ site.id }/tags` });
    const projectApi = useResource<Project>({ url: `/api/projects/${ site.projectId }` });

    return <Card sx={ { background: site.is_running ? "#555" : undefined } }>
        <Stack component={ "div" } direction={ "row" } spacing={ 1 }>
            <CardMedia component="img"
                height={ 300 }
                style={ { objectFit: "cover" } }
                image={ `/api/reports/${ report?.id }/thumbnail` }>
            </CardMedia>
        </Stack>
        <CardContent>
            <Stack component={ "div" } direction={ "row" } alignItems={ "center" } spacing={ 2 }>
                <Link href={ `/projects/${ site.projectId }` }>
                    <Typography color={ "textPrimary" }
                        variant={ "h5" }>{ projectApi.data?.name }</Typography>
                </Link>

                <Typography color={ "textPrimary" }
                    variant={ "h5" }>-</Typography>

                <Link href={ `/projects/${ site.projectId }/sites/${ site.id }` }>
                    <Typography color={ "textPrimary" }
                        variant={ "h5" }>{ site.name }</Typography>
                </Link>

                { site.is_running && <Typography sx={ { ml: 2 } } variant={ "body2" }>Running...</Typography> }
            </Stack>

            <Stack spacing={ 1 } direction={ "row" } py={ 2 }>
                { tagsApi.data?.map((tag: Tag) => <Chip label={ tag.name } key={ tag.id } />) }
            </Stack>


            <ProjectResultHistoryChart lines={ AUDIT_HISTORY_CHART_LINES } site={ site } />
        </CardContent>
        <CardActions>
            { report && <Link target={ '_blank' }
                href={ `/api/reports/${ report!.id }` }>
                <Button color={ 'secondary' } variant={ 'text' }>Open Report</Button>
            </Link> }
        </CardActions>
    </Card>;
}
