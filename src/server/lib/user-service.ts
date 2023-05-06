import { getPrisma } from "../get-prisma";
import sha1 from "sha1";

export const getUserByUsernameAndPassword = async (username: string, password: string) => {
    const hashedPassword = sha1(password);

    return getPrisma().user.findFirst({
        where: {
            username,
            password: hashedPassword
        }
    });
};

export const getUserByUsername = async(username:string) => {
    return getPrisma().user.findFirst({
        select: {
            username: true,
            id: true,
            can_start_audit: true,
        },
        where: {
            username,
        }
    });
}
