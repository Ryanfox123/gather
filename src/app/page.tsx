"use client";
import HomeClient from "./components/HomeClient";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <HomeClient />;
    </SessionProvider>
  );
}
