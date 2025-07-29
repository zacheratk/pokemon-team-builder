import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../APIs/supabaseClient";
import Card from "../Components/Card";

const Gallery = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("Pokemon")
        .select()
        .order("created_at", { ascending: true });

      setMembers(data);
      setIsLoading(false);
    };

    fetchTeam();
  }, []);

  return (
    <>
      <h1>Team Members</h1>

      {isLoading ? (
        <h2>Loading</h2>
      ) : members.length > 0 ? (
        <div className="container">
          {members.map((member) => (
            <Card
              nickname={member.nickname}
              id={member.id}
              nature={member.nature}
              species={member.species}
              sprite={member.sprite}
              key={member.id}
            />
          ))}
        </div>
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
