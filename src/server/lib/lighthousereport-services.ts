import { LighthouseRunReport, Project } from "@prisma/client";
import { getPrisma } from "../get-prisma";
import { LighthouseReport } from "../../../types/lighthouse";

export const getReportsForProject = (project: Project, type?: string, max = 10): Promise<LighthouseRunReport[]> => {
    return getPrisma().lighthouseRunReport.findMany({
        where: {
            projectId: project.id,
            type
        },
        orderBy: {
            date: "desc"
        },
        take: max
    });
}

export const persistReport = async (project: Project, data: LighthouseReport, htmlFilePath?: string) => {
    return getPrisma().lighthouseRunReport.create({
        data: {
            date: new Date(),
            SEO: data.categories['seo'].score * 100,
            PWA: data.categories['pwa'].score * 100,
            bestPractices: data.categories['best-practices'].score * 100,
            accessibility: data.categories['accessibility'].score * 100,
            performance: data.categories['performance'].score * 100,
            type: data.configSettings.formFactor,
            serverResponseTime: data.audits["server-response-time"].numericValue,
            tti: data.audits["interactive"].numericValue,
            finalUrl: data.finalUrl,
            stacks: data.stackPacks.map((stack) => stack.title),
            projectId: project.id,
            htmlReportFile: htmlFilePath,
        }
    })
}
export const getLatestReportForProject = async (project: Project, type?: string) => {
    return getPrisma().lighthouseRunReport.findFirst({
        where: {
            projectId: project.id,
            type,
        },
        orderBy: {
            date: "desc",
        }
    });
}

export const transformForSerialisation = (report: LighthouseRunReport) => {
    return {
        ...report,
        date: report.date.toISOString(),
    }
}
