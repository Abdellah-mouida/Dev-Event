import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";

const EventDetailsCopo = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex gap-2 items-center mt-2">
      <Image src={icon} alt={alt} width={17} height={17}></Image>
      <p>{label}</p>
    </div>
  );
};
const EventTag = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag, index) => (
        <div key={index} className="pill">
          {tag}
        </div>
      ))}
    </div>
  );
};
const AgendaItem = ({ items }: { items: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // Fetch event details using the slug
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      tags,
      organizer,
    },
  } = await response.json();
  if (!description) return notFound();
  const bookings = 10;
  return (
    <div id="event">
      <section>
        <div className="header">
          <h1>Event Description</h1>
          <p className="">{description}</p>
        </div>
        <div className="details">
          <div className="content">
            <Image
              src={image}
              alt="Event Poster"
              width={800}
              height={800}
              className="banner"
            />

            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>
            <section className="flex-col-gap-2">
              <h2>EventDetails</h2>
              <EventDetailsCopo
                icon="/icons/calendar.svg"
                alt="date"
                label={date}
              ></EventDetailsCopo>
              <EventDetailsCopo
                icon="/icons/clock.svg"
                alt="time"
                label={time}
              ></EventDetailsCopo>
              <EventDetailsCopo
                icon="/icons/pin.svg"
                alt="location"
                label={location}
              ></EventDetailsCopo>
              <EventDetailsCopo
                icon="/icons/mode.svg"
                alt="mode"
                label={mode}
              ></EventDetailsCopo>
              <EventDetailsCopo
                icon="/icons/audience.svg"
                alt="audience"
                label={audience}
              ></EventDetailsCopo>
            </section>
            <AgendaItem items={agenda}></AgendaItem>
            <section className="flex-col-gap-2">
              <h2>About Organizer</h2>
              <p>{organizer}</p>
            </section>
            <EventTag tags={tags}></EventTag>
          </div>
          <aside className="booking">
            <h2 className="text-lg font-semi ">Book Event</h2>
            <div className="signup-card">
              <h2>Book Your spot</h2>
              {bookings > 0 ? (
                <p className="text-sm">
                  {" "}
                  Join {bookings} people who have already booked their spots !!
                </p>
              ) : (
                <p className="text-sm">Be The First To Book !!</p>
              )}
              <BookEvent></BookEvent>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;
