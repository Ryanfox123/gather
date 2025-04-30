"use client";
import React from "react";
import { LuArrowBigLeftDash } from "react-icons/lu";
import { redirect } from "next/navigation";

function GoBackBtn() {
  return (
    <div className="ml-50 mb-2 w-20 flex flex-row">
      <LuArrowBigLeftDash className="mt-1 text-black" />
      <p
        className="text-black underline"
        onClick={() => {
          redirect("/");
        }}
      >
        {" "}
        Go back
      </p>
    </div>
  );
}

export default GoBackBtn;
