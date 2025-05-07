import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { autenticaUsuarioDB } from "@/bd/useCases/usuarioUseCases";
import { User as NextAuthUser } from "next-auth";
import { Usuario } from "@/bd/entities/Usuario";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 1800, // tempo em segundos - 30 minutos
    },
    pages: {
        signIn: '/login', 
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                senha: { label: "Senha", type: "password" },
            },
            async authorize(credentials, req): Promise<NextAuthUser | null> {
                if (!credentials?.email || !credentials.senha) {
                    return null;
                }
                let usuario: Usuario | null = null;
                try {
                    usuario = await autenticaUsuarioDB(credentials.email, credentials.senha);
                } catch (err) {
                    return null;
                }
                if (!usuario) {
                    return null;
                }
                return {
                    id: usuario.email,
                    email: usuario.email,
                    name: usuario.nome,
                    randomKey: parseInt((Math.random() * 9999).toString())
                } as any;
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            console.log("Session Callback", { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    // name : session.user.name,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            console.log("JWT Callback", { token, user });
            if (user) {
                const u = user;
                return {
                    ...token,
                    id: u.id,
                    randomKey: (user as any).randomKey,
                };
            }
            return token;
        },
    },
};