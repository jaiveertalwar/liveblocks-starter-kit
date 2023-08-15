import NextAuth from "next-auth";
import { User } from "../../../types";
import Auth0Provider from "next-auth/providers/auth0";

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions = {
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }: { session: any }) {
      // Implement your session logic here
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
};

export default NextAuth(authOptions);
