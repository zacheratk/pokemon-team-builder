import { useEffect, useState } from "react";
import { getDataById } from "../APIs/getSupabaseData";
import { Link, useParams } from "react-router-dom";

const DetailView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [member, setMember] = useState({});
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    getDataById(id)
      .then((data) => {
        setMember(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <article>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <img src={member.sprite} alt={member.species} />
          <div>
            <h1>{member.nickname}</h1>
            <h3>Species: {member.species}</h3>
            <p>Pokédex Number: {member.pokedex_number}</p>
            <p>Nature: {member.nature}</p>
          </div>
          <p>Description:</p>
          <p>{member.description}</p>
        </>
      )}
      <Link to="/gallery">
        <button>Go Back</button>
      </Link>
    </article>
  );
};

export default DetailView;
