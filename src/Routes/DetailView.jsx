import { useEffect, useState } from "react";
import { getDataById } from "../APIs/getSupabaseData";
import { Link, useParams } from "react-router-dom";
import { removeDataById } from "../APIs/getSupabaseData";

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

  const handleDelete = async () => {
    await removeDataById(id);

    window.location = "/gallery";
  };

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
      <div>
        <Link to={"/edit/" + id}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <Link to="/gallery">
        <button>Go Back</button>
      </Link>
    </article>
  );
};

export default DetailView;
