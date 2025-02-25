import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const email = credentials?.email;
                    const password = credentials?.password;
                    const res = await axios.post("/auth/login", { email, password });
                    if(res.status != 200) throw new Error("Credenciais inválidas!");

                    const user = res.data;
                    return user ? { id: user.id, name: user.name, email: user.email, token: user.token } : null;
                } catch (error) {
                    throw new Error("Erro ao autenticar!");
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.accessToken = user.token;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user.id = token.id;
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export const GET = handler;
export const POST = handler;