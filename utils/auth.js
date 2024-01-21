import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";
import { getServerSession } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session:{
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.idontknow = 'hello world';
        session.user.role = token.role;
        session.user.image = token.image;

      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser= await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      })

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        picture: dbUser.picture,
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
