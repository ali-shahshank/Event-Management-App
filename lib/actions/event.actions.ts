'use server';

import connectDB from '../mongodb';
import Event, { IEvent } from '@/database/event.model';

// Fetches events that share at least one tag with the given event (by slug),
// excluding the event itself. Returns an empty array on any failure.
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
    });

    return similarEvents;
  } catch (error) {
    console.error('Failed to fetch similar events:', error);
    return [];
  }
};
