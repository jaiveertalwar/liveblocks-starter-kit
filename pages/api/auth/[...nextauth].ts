import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers";
import { getUser } from "../../../lib/server";
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
    CredentialsProvider({
      credentials: {
        // Define credential fields here
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const user: User | null = await getUser(credentials.email);

        if (!user) {
          throw new Error("User not found");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.avatar,
        };
      },
    }),

    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
};

export default NextAuth(authOptions);
