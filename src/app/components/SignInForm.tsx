"use client";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  setAuthMethod: React.Dispatch<React.SetStateAction<string | null>>;
};

function SignInForm({ setAuthMethod }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    const checkSession = async () => {
      const maxTries = 10;
      for (let i = 0; i < maxTries; i++) {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        if (session?.user?.id) {
          router.push("/");
          return;
        }
        await new Promise((r) => setTimeout(r, 300));
      }
      setError("Login succeeded, but session not established.");
    };

    checkSession();
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-3xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-lightViolet">
        Sign in to your account
      </h2>

      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-gray-700 block mb-1">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-newBlue"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 block mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-newBlue"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-lightViolet to-newBlue text-white font-semibold py-2 rounded-xl hover:brightness-110 transition"
        >
          Sign in
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        {"Don't have an account? "}
        <button
          className="text-lightViolet font-medium hover:underline"
          onClick={() => setAuthMethod("signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default SignInForm;
