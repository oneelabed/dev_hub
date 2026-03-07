import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ExploreBtn"

const events = [
  {image: '/images/event1.png', title: 'Event 1'},
  {image: '/images/event2.png', title: 'Event 2'},
  {image: '/images/event3.png', title: 'Event 3'},
  {image: '/images/event4.png', title: 'Event 4'},
  {image: '/images/event5.png', title: 'Event 5'},

]

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