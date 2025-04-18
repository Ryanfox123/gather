"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
      <p>This is a protected route, only accessible to logged-in users.</p>
    </div>
  );
};
export default Dashboard;
