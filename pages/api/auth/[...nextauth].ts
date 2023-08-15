import NextAuth from "next-auth";
import { User } from "../../../types";
import Auth0Provider from "next-auth/providers/auth0";

// Your NextAuth secret (generate a new one for production)
// More info: https://next-auth.js.org/configuration/options#secret
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions = {
  secret: NEXTAUTH_SECRET,
  callbacks: {
    // Get extra user info from your database to pass to front-end
    // For front end, update next-auth.d.ts with session type
    async session({ session }: { session: any }) {
      // Replace this logic with your actual user retrieval logic
      const userFromDatabase = await UserFromDatabase(session.user.email);

      if (!userFromDatabase) {
        throw new Error("User not found");
      }

      session.user.info = userFromDatabase;
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
