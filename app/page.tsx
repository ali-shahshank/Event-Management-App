import ExploreBtn from '@/components/ExploreBtn';

const Home = () => {
  return (
    <main>
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-center">Full-stack Next.js Event App</h1>
        <p className="text-center mt-5">
          Hackathons, meetups and conferences all in one place.
        </p>
        <ExploreBtn />
        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className="events">
            {[1, 2, 3, 4, 5].map((event) => (
              <li key={event}>Event{event}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
