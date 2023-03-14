import { useResource } from "../hooks/use-resource";
import { LighthouseRunReport, Site } from "@prisma/client";
import { HistoryChart } from "./history-chart";
import React from "react";

export type ProjectHistoryChartProps = {
    site: Site;
    lines: { label: string, color: string }[]
}

export const ProjectResultHistoryChart = ({ site, lines }: ProjectHistoryChartProps) => {
    const reportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${ site.projectId }/sites/${ site.id }/reports`,
        params: { type: "desktop", limit: 5 }
    });

    if (!reportsApi.data) {
        return null;
    }

    return <HistoryChart keys={ lines } data={ [ ...reportsApi.data ].reverse() } />;
};
