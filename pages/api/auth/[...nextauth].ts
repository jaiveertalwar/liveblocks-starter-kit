import NextAuth from "next-auth";
import { getUser } from "../../../lib/server";
import { User } from "../../../types";
import GoogleProvider from "next-auth/providers/google";

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions = {
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        const userInfo: User | null = await getUser(session.user.email);

        if (!userInfo) {
          throw new Error("User not found");
        }

        session.user.info = userInfo;
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        throw error; // Rethrow the error to prevent session creation
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export default NextAuth(authOptions);
