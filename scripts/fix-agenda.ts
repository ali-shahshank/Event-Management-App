/**
 * One-off fix script — repairs an Event document whose `agenda` field
 * was stored as a single newline-separated string (each line prefixed
 * with "agenda | ") instead of a proper string[] with one item per entry.
 *
 * Run with: npx tsx scripts/fix-agenda.ts <slug>
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import connectDB from '../lib/mongodb';
import Event from '../database/event.model';

async function fixAgenda(slug: string) {
  await connectDB();

  const event = await Event.findOne({ slug });
  if (!event) {
    console.error(`No event found with slug "${slug}"`);
    process.exit(1);
  }

  // Current agenda is likely a single-element array containing the
  // entire block, with each line prefixed by "agenda | ".
  const raw = event.agenda.join('\n');

  const fixedAgenda = raw
    .split('\n')
    .map(({ line }: { line: string }) =>
      line.replace(/^agenda\s*\|\s*/, '').trim(),
    )
    .filter(({ line }: { line: string }) => line.length > 0);

  console.log('Before:', event.agenda);
  console.log('After:', fixedAgenda);

  event.agenda = fixedAgenda;
  await event.save();

  console.log(`Fixed agenda for "${event.title}".`);
  process.exit(0);
}

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npx tsx scripts/fix-agenda.ts <slug>');
  process.exit(1);
}

fixAgenda(slug);
