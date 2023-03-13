import { useResource } from "../hooks/use-resource";
import { LighthouseRunReport, Project } from "@prisma/client";
import { HistoryChart } from "./history-chart";
import React from "react";

export type ProjectHistoryChartProps = {
    project: Project;
    lines: { label: string, color: string }[]
}

export const ProjectResultHistoryChart = ({ project, lines }: ProjectHistoryChartProps) => {
    const reportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${ project.id }/reports`,
        params: { type: "desktop", limit: 5 }
    });

    if (!reportsApi.data) {
        return null;
    }

    return <HistoryChart hideXAxis keys={ lines } data={ [ ...reportsApi.data ].reverse() } />;
};
