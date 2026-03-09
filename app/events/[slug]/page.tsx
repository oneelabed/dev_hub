import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import getSimilarEventBySlug from "@/lib/actions/event.action";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({icon, alt, label} : {icon: string; alt: string; label: string;}) => {
    return (
        <div className="flex-row-gap-2 items-center">
            <Image src={icon} alt={alt} width={17} height={17} />
            <p>{label}</p>
        </div>
    )
}

const EventAgenda = ({agendaItems} : {agendaItems: string[]}) => {
    return (
        <div className="agenda">
            <h2>Agenda</h2>
            <ul>
                {agendaItems.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

const EventTags = ({ tags } : {tags: string[]}) => {
    return (
        <div className="flex-row-gap-2 flex-wrap">
            {tags.map((tag) => (
                <div className="pill" key={tag}>{tag}</div>
            ))}
        </div>
    )
}


const EventDetailsPage = async ({ params }: {params: Promise<{ slug: string}>}) => {
    "use cache";
    cacheLife("hours");
    const {slug} = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const {event} = await request.json();

    if (!event) return notFound();

    const bookings = 10;

    const similarEvents : IEvent[] = await getSimilarEventBySlug(slug)

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{event.description}</p>
            </div>

            <div className="details">
                {/*left side*/}
                <div className="content">
                    <Image src={event.image} alt="Event Banner" width={800} height={800} className="banner"></Image>
               
                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{event.overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={event.date} />
                        <EventDetailItem icon="/icons/calendar.svg" alt="clock" label={event.time} />
                        <EventDetailItem icon="/icons/calendar.svg" alt="pin" label={event.location} />
                        <EventDetailItem icon="/icons/calendar.svg" alt="mode" label={event.mode} />
                        <EventDetailItem icon="/icons/calendar.svg" alt="audience" label={event.audience} />
                    </section>

                    <EventAgenda agendaItems={event.agenda} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{event.organizer}</p>
                    </section>

                    <EventTags tags={event.tags} />
                </div>
                {/*right side*/}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot!
                            </p>
                        ) : (
                            <p className="text-sm">
                                Be the first to book your spot!
                            </p>
                        )}

                        <BookEvent eventId={event.id} slug={event.slug}/>
                    </div>
                </aside>
            </div>
            
            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard key={similarEvent.title} {...similarEvent /*this way spreads all params neccessary*/}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EventDetailsPage