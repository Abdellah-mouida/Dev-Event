import ExploreButton from "@/components/ExploreButton";
import EventCard from "@/components/EvenCard";
import { IEvent } from "@/database";
// // import events from "@/lib/constant";

// Example: button click
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const HomePage = async () => {
  const response = await fetch(`${BASE_URL}/api/events`);

  const { events } = await response.json();
  console.log(events);
  return (
    <section>
      <h1 className="text-center">
        The Hub of Every Dev <br /> Event You Mustn&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathones , Meetups , and Conferences , All in One Place
      </p>
      <ExploreButton></ExploreButton>
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <div key={event.slug} className="event-card-wrapper">
                <EventCard {...event} />
              </div>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default HomePage;
