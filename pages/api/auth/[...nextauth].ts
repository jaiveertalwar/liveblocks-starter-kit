import NextAuth from "next-auth";
import { User } from "../../../types";
import { GoogleAuth } from "google-auth-library";
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
      const userInfo: User | null = await getUser(session.user.email);

      if (!userInfo) {
        throw new Error("User not found");
      }

      session.user.info = userInfo;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    {
      id: "google",
      name: "Google",
      type: "oauth",
      version: "2.0",
      scope: "profile email",
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/auth?response_type=code",
      profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      profile(profile: any) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    // Other providers if needed
