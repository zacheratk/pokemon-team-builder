import { Link } from "react-router-dom";

const Gallery = () => {
  const members = [];
  return (
    <>
      <h1>Team Members</h1>

      {members.length > 0 ? (
        <div className="container">{/* TODO: Add member cards */}</div>
      ) : (
        <>
          <h2>You haven't added any team members!</h2>
          <p>To see your team members, you first need to add a team member</p>
          <Link to="/create">
            <button>Create Member</button>
          </Link>
        </>
      )}
    </>
  );
};

export default Gallery;
