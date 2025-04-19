import React from "react";
import { Playwrite_RO } from "next/font/google";

const playwrite = Playwrite_RO({ weight: "400" });
function Welcome() {
  return (
    <div className="flex mx-auto w-fit flex-col mt-6">
      <p className="text-sm mx-auto text-gray-500">Welcome to</p>
      <div className="p-[10px] bg-gradient-to-r from-lightViolet to-newBlue rounded-3xl">
        <div className="bg-white w-max text-7xl  p-10 text-center rounded-2xl">
          <h1 className={`${playwrite.className} text-lightViolet`}>Gather</h1>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
