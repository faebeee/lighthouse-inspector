import { LighthouseRunReport, Site } from "@prisma/client";
import { getPrisma } from "../../get-prisma";
import { getSites } from "../site";
import { LighthouseReport } from "../../../../types/lighthouse";

export const getLatestReportsForAllSites = async (type?: string) => {
    const sites = await getSites();
    const a = {} as Record<number, LighthouseRunReport | null>;
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        a[site.id] = await getLatestReportForSite(site, type);
    }
    return a;
};

export const getReportsForSite = (site: Site, type?: string, max = 10): Promise<LighthouseRunReport[]> => {
    return getPrisma().lighthouseRunReport.findMany({
        where: {
            siteId: site.id,
            type
        },
        orderBy: {
            date: "desc"
        },
        take: max
    });
};

export const persistReport = async (site: Site, data: LighthouseReport, htmlFilePath?: string) => {
    return getPrisma().lighthouseRunReport.create({
        data: {
            date: new Date(),
            SEO: data.categories["seo"].score * 100,
            PWA: data.categories["pwa"].score * 100,
            bestPractices: data.categories["best-practices"].score * 100,
            accessibility: data.categories["accessibility"].score * 100,
            performance: data.categories["performance"].score * 100,
            type: data.configSettings.formFactor,
            serverResponseTime: data.audits["server-response-time"].numericValue,
            tti: data.audits["interactive"].numericValue,
            finalUrl: data.finalUrl,
            stacks: data.stackPacks.map((stack) => stack.title),
            siteId: site.id,
            htmlReportFile: htmlFilePath,
            is_crawlable: data.audits['is-crawlable'].score === 1
        }
    });
};

export const getLatestReportForSite = async (site: Site, type?: string) => {
    return getPrisma().lighthouseRunReport.findFirst({
        where: {
            siteId: site.id,
            type
        },
        orderBy: {
            date: "desc"
        }
    });
};


export const transformForSerialisation = (report: LighthouseRunReport) => {
    return {
        ...report,
        date: report.date.toISOString()
    };
};
