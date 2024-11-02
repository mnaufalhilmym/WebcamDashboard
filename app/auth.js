import { getServerSession } from "next-auth";
import { prisma } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token }) => {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (dbUser) {
        token.id = dbUser.id;
        token.credits = dbUser.credits;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.credits = token.credits;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
