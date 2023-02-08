import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByUsernameAndPassword } from "../../../src/server/lib/user-service";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = credentials ? await getUserByUsernameAndPassword(credentials.username, credentials.password) : null;

                if (!!user) {
                    return {
                        id: user.id.toString(),
                        name: user.username
                    };
                }
                return null;
            }
        })
    ]
};
export default NextAuth(authOptions);
