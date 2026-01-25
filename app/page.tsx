import ExploreButton from "@/components/ExploreButton";
import EventCard from "@/components/EvenCard";
import { time } from "console";
import events from "@/constant";

const HomePage = () => {
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
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              image={event.image}
              slug={event.slug}
              time={event.time}
              Date={event.Date}
              location={event.location}
            ></EventCard>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomePage;
