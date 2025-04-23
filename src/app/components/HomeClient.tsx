import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import EventList from "./EventList";
import UpcomingEvents from "./UpcomingEvents";

export default function HomeClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <Welcome />
      <div className="flex flex-row">
        <UpcomingEvents />
        <EventList />
      </div>
    </div>
  );
}
