import Link from 'next/link';
import Image from 'next/image';

interface props {
  title: string;
  image: string;
}

const EventCard = ({ title, image }: props) => {
  return (
    <>
      <Link
        className="event-card"
        href={'/'}
      >
        <Image
          className="poster"
          src={image}
          alt="Event 1 image"
          width={410}
          height={300}
        />
        <p>{title}</p>
      </Link>
    </>
  );
};

export default EventCard;
