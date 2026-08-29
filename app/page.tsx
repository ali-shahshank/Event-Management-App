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
      </section>
    </main>
  );
};

export default Home;
