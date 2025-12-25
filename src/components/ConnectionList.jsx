import { Link } from "react-router-dom";
import { addFromUserDetails } from "../utils/chatSlice";
import { useDispatch } from "react-redux";

const ConnectionList = ({ items, options }) => {
  const dispatch = useDispatch();
  return (
    <li className="list-row">
      <div>
        <img className="size-10 rounded-box" src={items.profileURL} />
      </div>
      <div>
        <div>{items.firstName + " " + items.lastName}</div>
      </div>
      <button className="btn btn-secondary">{options[0]}</button>
      <Link to={"/chat/" + items._id}>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(addFromUserDetails(items));
          }}>
          {options[1]}
        </button>
      </Link>
    </li>
  );
};

export default ConnectionList;
