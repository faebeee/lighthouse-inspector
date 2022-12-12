import { getPrisma } from "./get-prisma"

export const getReportById = async (id: number) => {
    return getPrisma().lighthouseRunReport.findFirst({ where: { id } });
}