"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

function GoogleAuthButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center mt-5 justify-center mx-auto gap-3 w-full max-w-xs px-4 py-2 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white text-black font-medium"
    >
      <FcGoogle size={20} />
      <span>Continue with Google</span>
    </button>
  );
}

export default GoogleAuthButton;
