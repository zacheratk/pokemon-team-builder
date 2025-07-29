import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="card">
      <h3>
        {props.nickname} the {props.species}
      </h3>
      <img src={props.sprite} alt={props.species} />
      <p>Nature: {props.nature}</p>
      <Link to={"/gallery/" + props.id}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default Card;
