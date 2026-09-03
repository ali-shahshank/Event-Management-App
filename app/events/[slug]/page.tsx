import { notFound } from 'next/navigation';
import { IEvent } from '@/database';
import Image from 'next/image';

// Event details component
const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Image
        src={icon}
        alt={alt}
        width={24}
        height={24}
      />
      <p>{label}</p>
    </div>
  );
};

// Event agenda component
export const EventAgendaItem = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Event details page
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);

  // Render the not-found page when the event doesn't exist
  if (request.status === 404) {
    notFound();
  }

  // Handle any other non-success response (e.g. 500) gracefully
  if (!request.ok) {
    throw new Error('Failed to load event details');
  }

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
    },
  }: { event: IEvent } = await request.json();

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1> <p>{description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt="Event Image"
            height={800}
            width={800}
          />
        </div>
        <section className="flex-col-gap-2">
          <h2>Overview</h2>
          <p>{overview}</p>
        </section>
        <section className="flex-col-gap-2">
          <h2>Event Details</h2>
          <div className="flex flex-col gap-2">
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="Calendar Icon"
              label={date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="Clock Icon"
              label={time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="Pin Icon"
              label={location}
            />
            <EventDetailItem
              icon="/icons/mode.svg"
              alt="Mode Icon"
              label={mode}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="Audience Icon"
              label={audience}
            />
          </div>
        </section>
        <EventAgendaItem agendaItems={agenda} />
      </div>
    </section>
  );
};

export default EventDetailsPage;
