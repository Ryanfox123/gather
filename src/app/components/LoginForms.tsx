"use client";
import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import GoogleAuthButton from "./GoogleAuthButton";

function LoginForms() {
  const [authMethod, setAuthMethod] = useState("signin");
  return (
    <div className="w-full">
      {!authMethod && (
        <div className="flex flex-col mt-8 gap-2 mx-auto">
          {" "}
          <button
            className="bg-gradient-to-r from-lightViolet to-newBlue rounded-2xl w-36 mx-auto"
            onClick={() => {
              setAuthMethod("signup");
            }}
          >
            Sign up
          </button>
          <p className="text-center text-black text-xs">
            Have an account already ?
          </p>
          <button
            className="bg-gradient-to-r from-lightViolet to-newBlue rounded-2xl w-36 mx-auto"
            onClick={() => {
              setAuthMethod("signin");
            }}
          >
            Sign in
          </button>
          <GoogleAuthButton />
        </div>
      )}
      {authMethod === "signup" ? (
        <SignUpForm setAuthMethod={setAuthMethod} />
      ) : authMethod === "signin" ? (
        <SignInForm setAuthMethod={setAuthMethod} />
      ) : null}
    </div>
  );
}

export default LoginForms;
