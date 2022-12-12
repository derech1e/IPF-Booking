import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith"},
        password: { label: "Password", type: "password"},
      },
      authorize: async (credentials, req) => {
        const user = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            body: Object.entries(credentials)
              .map((e) => e.join("="))
              .join("&"),
          },
        )
          .then((res) => res.json())
          .catch((err) => {
            return null;
          });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // pages
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  logger: {
    error: (code, metadata) => {
        console.log(metadata)
    },
    warn: (code) => {
        console.log(code)
    },
    debug: (code, metadata) => {
        console.log(metadata)
    },
  },
  session: { strategy: "jwt" },
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, options);
export default authHandler;