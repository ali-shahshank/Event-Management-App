'use server';

import connectDB from '../mongodb';
import Event, { IEvent } from '@/database/event.model';

// Fetches events that share at least one tag with the given event (by slug),
// excluding the event itself. Uses .lean() and stringifies _id so the result
// is a plain, serializable object safe to pass from Server to Client Components.
// Returns an empty array on any failure.
export const getSimilarEventsBySlug = async (
  slug: string,
): Promise<IEvent[]> => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    if (!event) {
      return [];
    }

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    // .lean() returns plain objects, but _id is still a BSON ObjectId —
    // convert it to a string so it's safe to serialize across the
    // Server -> Client Component boundary.
    return similarEvents.map((e) => ({
      ...e,
      _id: String(e._id),
    })) as IEvent[];
  } catch (error) {
    console.error('Failed to fetch similar events:', error);
    return [];
  }
};
