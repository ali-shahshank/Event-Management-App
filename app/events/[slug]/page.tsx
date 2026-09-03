import { notFound } from 'next/navigation';
import { IEvent } from '@/database';

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

  const { event }: { event: IEvent } = await request.json();

  return <section>EventDetailsPage: {slug}</section>;
};

export default EventDetailsPage;
