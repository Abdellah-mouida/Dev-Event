import Link from "next/link";
import React from "react";
import Image from "next/image";
interface Props {
  title: string;
  image: string;
  slug: string;
  time: string;
  Date: string;
  location: string;
}

const EvenCard = ({ title, image, slug, time, Date, location }: Props) => {
  return (
    <Link href={"/events"} id="event-card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      ></Image>
      <div className="flex flex-row gap-2">
        <Image src={"/icons/pin.svg"} alt="loc" width={14} height={14}></Image>
        <p className="location">{location}</p>
      </div>
      <p className="title">{title}</p>
      <div className="datetime">
        <div>
          <Image
            src={"/icons/calendar.svg"}
            alt="date"
            width={14}
            height={14}
          ></Image>
          <p className="location">{Date}</p>
        </div>
        <div>
          <Image
            src={"/icons/clock.svg"}
            alt="clock"
            width={14}
            height={14}
          ></Image>
          <p className="location">{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EvenCard;
