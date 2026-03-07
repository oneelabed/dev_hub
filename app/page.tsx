import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ExploreBtn"

import { events } from "@/lib/constants"

const page = () => {
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
          {events.map((Event) => (
            <li key={Event.title}>
              <EventCard {... Event}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page