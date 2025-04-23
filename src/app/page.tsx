import HomeClient from "./components/HomeClient";
import SessionWrapper from "./components/SessionWrapper";

export default function Home() {
  return (
    <SessionWrapper>
      <HomeClient />
    </SessionWrapper>
  );
}
