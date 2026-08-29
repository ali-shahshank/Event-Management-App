'use client';

function ExploreBtn() {
  const handleExploreBtn = () => {
    console.log('Explore Button');
  };

  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-5 inline-flex items-center gap-2"
      onClick={handleExploreBtn}
    >
      <span>Explore Events</span>
      <img
        src="/icons/arrow-down.svg"
        alt="Arrow down"
        className="h-4 w-4"
      />
    </button>
  );
}

export default ExploreBtn;
