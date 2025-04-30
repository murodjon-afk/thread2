import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        // Найти пользователя по email
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (existingUser) {
          return {
            id: existingUser.id.toString(),
            email: existingUser.email,
            name: existingUser.name,
          };
        }

        // Создать нового пользователя
        const newUser = await prisma.user.create({
          data: {
            email: credentials.email,
            name: credentials.email.split("@")[0],
          },
        });

        return {
          id: newUser.id.toString(),
          email: newUser.email,
          name: newUser.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
