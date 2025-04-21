import EventList from "./components/EventList";
import NavBar from "./components/NavBar";
import UpcomingEvents from "./components/UpcomingEvents";
import Welcome from "./components/Welcome";

export default function Home() {
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
