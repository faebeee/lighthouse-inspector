import glob from "glob";
import { REPORTS_FOLDER } from "../../../config";
import {getPrisma} from "../get-prisma";

export const getProjects = async (): Promise<Project[]> => {
    getPrisma().project.findMany();
};
