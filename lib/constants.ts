export interface Event {
  title: string;
  slug: string;
  image: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  city?: string;
  state?: string;
}

export const events: Event[] = [
  {
    title: 'React Conference 2025',
    slug: 'react-conference-2025',
    image: '/images/event1.png',
    description:
      'A comprehensive conference for React developers with talks on latest features, performance optimization, and best practices.',
    date: 'March 15-17, 2025',
    time: '09:00 AM - 06:00 PM',
    location: 'Las Vegas, NV',
    city: 'Las Vegas',
    state: 'NV',
  },
  {
    title: 'Next.js Summit',
    slug: 'nextjs-summit',
    image: '/images/event2.png',
    description:
      'Learn about the latest Next.js features, from App Router to Turbopack, with live coding sessions and workshops.',
    date: 'April 10-11, 2025',
    time: '08:30 AM - 05:30 PM',
    location: 'San Francisco, CA',
    city: 'San Francisco',
    state: 'CA',
  },
  {
    title: 'Web Accessibility Conference',
    slug: 'web-accessibility-conference',
    image: '/images/event3.png',
    description:
      'Focused on building inclusive web experiences. Learn WCAG standards, testing methodologies, and accessible design patterns.',
    date: 'May 5-6, 2025',
    time: '10:00 AM - 04:00 PM',
    location: 'New York, NY',
    city: 'New York',
    state: 'NY',
  },
  {
    title: 'Global DevOps Bootcamp',
    slug: 'global-devops-bootcamp',
    image: '/images/event4.png',
    description:
      'Hands-on bootcamp covering CI/CD pipelines, containerization, Kubernetes, and cloud infrastructure best practices.',
    date: 'May 20-22, 2025',
    time: '09:00 AM - 05:00 PM',
    location: 'Seattle, WA',
    city: 'Seattle',
    state: 'WA',
  },
  {
    title: 'TypeScript Advanced Workshop',
    slug: 'typescript-advanced-workshop',
    image: '/images/event5.png',
    description:
      'Deep dive into TypeScript with experts. Topics include advanced types, generics, decorators, and real-world patterns.',
    date: 'June 10-12, 2025',
    time: '09:30 AM - 04:30 PM',
    location: 'Austin, TX',
    city: 'Austin',
    state: 'TX',
  },
  {
    title: 'JavaScript Performance Summit',
    slug: 'javascript-performance-summit',
    image: '/images/event6.png',
    description:
      'Optimize your JavaScript applications. Learn about bundling, tree-shaking, lazy loading, and runtime performance.',
    date: 'July 8-9, 2025',
    time: '08:00 AM - 06:00 PM',
    location: 'Berlin, Germany',
    city: 'Berlin',
    state: 'Germany',
  },
];
