import React from "react";
import SessionWrapper from "../components/SessionWrapper";
import CreateEvent from "../components/CreateEvent";

function page() {
  return (
    <SessionWrapper>
      <CreateEvent />
    </SessionWrapper>
  );
}

export default page;
