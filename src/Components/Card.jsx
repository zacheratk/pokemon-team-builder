import { Link, Navigate } from "react-router-dom";
import { removeDataById } from "../APIs/getSupabaseData";

const Card = (props) => {
  const handleDelete = async () => {
    await removeDataById(props.id);

    window.location.reload();
  };

  return (
    <div className="card">
      <h3>
        {props.nickname} the {props.species}
      </h3>
      <img src={props.sprite} alt={props.species} />
      <p>Nature: {props.nature}</p>
      <Link to={"/gallery/" + props.id}>
        <button className="btn-primary">View Details</button>
      </Link>
      <Link to={"/edit/" + props.id}>
        <button className="btn-warning">Edit</button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Card;
