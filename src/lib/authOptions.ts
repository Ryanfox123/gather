import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUserIfNotExists } from "@/lib/userService";
import { loginFunction } from "@/app/utils/logInFunc";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await loginFunction(
            credentials.email,
            credentials.password
          );
          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              events: user.events,
              admin: user.admin,
            };
          }
        } catch (error) {
          console.error("Login failed:", error);
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid profile email https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires_at = account.expires_at;
      }

      if (user?.email && user?.name) {
        try {
          const dbUser = await createUserIfNotExists({
            name: user.name,
            email: user.email,
          });

          token.id = dbUser._id.toString();
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.events = dbUser.events;
          token.admin = dbUser.admin;
        } catch (error) {
          console.error("Error creating or fetching user:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.events = token.events as string[];
        session.user.accessToken = token.accessToken as string;
        session.user.admin = token.admin as boolean;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
