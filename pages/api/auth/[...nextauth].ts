import NextAuth from "next-auth";
import { User } from "../../../types";
import axios from "axios";
import qs from "qs";

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
      scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://oauth2.googleapis.com/token",
      authorizationUrl:
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${process.env.NEXTAUTH_URL}/api/auth/callback/google&state=${encodeURIComponent(
          JSON.stringify({ callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/google` })
        )}`,
      profileUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
      async profile(profile: any, tokens: any) {
        const response = await axios.get(profileUrl, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`
          }
        });

        return {
          id: response.data.sub,
          name: response.data.name,
          email: response.data.email,
          image: response.data.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
