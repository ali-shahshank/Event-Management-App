const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <>
      <div>
        <p>Showing details for #{id}</p>
      </div>
    </>
  );
};

export default UserDetails;
