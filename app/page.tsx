import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  "use cache";
  cacheLife("hours");
  let events;
  
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    
    if (!response.ok) {
       throw new Error('Failed to fetch events');
    }

    const { data } = await response.json();
    events = data.events;
    
  } catch (error) {
    console.error("Build Error: Ensure NEXT_PUBLIC_BASE_URL is set", error);
    return <div>Error loading events.</div>;
  }

  return (
    <section>
      <h1 className="text-center">Welcome</h1>
      <p className="text-center mt-5">Hackathons, meetups, and confrences</p>
    
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>
          Featured Events
        </h3>

        <ul className="events">
          {events && events.length > 0 && events.map((Event: IEvent) => (
            <li key={Event.title} className="list-none">
              <EventCard {... Event}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page