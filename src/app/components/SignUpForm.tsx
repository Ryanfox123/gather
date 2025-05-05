import React from "react";
import { useState } from "react";

type Props = {
  setAuthMethod: React.Dispatch<React.SetStateAction<string | null>>;
};

type SignUpFormState = {
  name: string;
  email: string;
  password: string;
};

function SignUpForm({ setAuthMethod }: Props) {
  const [signUpForm, setSignUpForm] = useState<SignUpFormState>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signed in successfully");
        setAuthMethod(null);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-3xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-lightViolet">
        Create your account
      </h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-gray-700 block mb-1">Full name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={signUpForm.name}
            onChange={(e) =>
              setSignUpForm({ ...signUpForm, name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-newBlue"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 block mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={signUpForm.email}
            onChange={(e) =>
              setSignUpForm({ ...signUpForm, email: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-newBlue"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 block mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={signUpForm.password}
            onChange={(e) => {
              console.log(signUpForm);
              setSignUpForm({ ...signUpForm, password: e.target.value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-newBlue"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-lightViolet to-newBlue text-white font-semibold py-2 rounded-xl hover:brightness-110 transition"
        >
          Create Account
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          className="text-lightViolet font-medium hover:underline"
          onClick={() => setAuthMethod("signin")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
