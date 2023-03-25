import { Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { LighthouseRunReport, Project, Site } from "@prisma/client";
import { useResource } from "../hooks/use-resource";
import { ProjectResultHistoryChart } from "./project-result-history-chart";
import { AUDIT_HISTORY_CHART_LINES, DATE_FORMAT } from "../../config.web";
import { format } from "date-fns";

export type ProjectCardProps = {
    site: Site;
    report?: LighthouseRunReport | null
}
export const ProjectCard = ({ report, site }: ProjectCardProps) => {
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

            <ProjectResultHistoryChart lines={ AUDIT_HISTORY_CHART_LINES } site={ site } />
        </CardContent>
        <CardActions sx={ { justifyContent: "space-between", alignItems: "center" } }>
            { report && <Link target={ "_blank" }
              href={ `/api/reports/${ report!.id }` }>
              <Button color={ "secondary" } variant={ "text" }>Open Report</Button>
            </Link> }

            { report && <Typography variant={ "caption" }>
                { format(new Date(report.date), DATE_FORMAT) }
            </Typography> }
        </CardActions>
    </Card>;
}
