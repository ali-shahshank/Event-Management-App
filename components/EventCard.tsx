import Link from 'next/link';
import Image from 'next/image';

interface props {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ image, title, slug, location, date, time }: props) => {
  return (
    <>
      <Link
        className="event-card"
        href={`/events ${slug}`}
      >
        <Image
          className="poster"
          src={image}
          alt="Event 1 image"
          width={410}
          height={300}
        />
        <div className="flex flex-row gap-3 mt-2">
          <Image
            src="/icons/pin.svg"
            alt="location pin icon"
            height={14}
            width={14}
          />
          {location}
        </div>
        <p>{title}</p>
        <div className="datetime flex gap-3">
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            height={14}
            width={14}
          />
          {date}
        </div>
        <div className="flex gap-3">
          <Image
            src="/icons/clock.svg"
            alt="time"
            height={14}
            width={14}
          />
          {time}
        </div>
      </Link>
    </>
  );
};

export default EventCard;
