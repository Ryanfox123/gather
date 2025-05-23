/// <reference types="next-auth" />

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      events?: string[];
      accessToken: string;
      admin: boolean;
    };
  }

  interface User {
    id: string;
    events?: string[];
    admin: boolean;
  }
}
