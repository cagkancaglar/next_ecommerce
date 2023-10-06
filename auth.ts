import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginCredentials } from "./app/types";

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, request) {
        const { email, password } = credentials as LoginCredentials;

        const { user, error } = await fetch(
          "http://localhost:3000/api/users/login",
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
          }
        ).then(async (res) => await res.json());

        if (error) {
          throw new Error(error);
        }

        return { id: user.id };
      },
    }),
  ],
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
