import React from "react";
import { Playwrite_RO } from "next/font/google";

const playwrite = Playwrite_RO({ weight: "400" });
function Welcome() {
  return (
    <div>
      <div className="mx-auto w-fit mt-20 text-black ">
        <h1 className="text-3xl text-center">Welcome, Ryan 👋 </h1>
        <p>
          Your calendar appears to be empty, have a look below to sign up to
          some events
        </p>
      </div>
    </div>
  );
}

export default Welcome;
