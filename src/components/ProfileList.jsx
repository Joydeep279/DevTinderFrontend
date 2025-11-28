import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const ProfileList = ({ items, options }) => {
  const dispatch = useDispatch();
  async function reviewConnection(status, id) {
    // await axios.post(
    //   BASE_URL + "/request/review/" + status + "/" + id,
    //   {},
    //   {
    //     withCredentials: true,
    //   }
    // );
    dispatch(removeRequest(id));
  }

  return (
    <li className="list-row">
      <div>
        <img className="size-10 rounded-box" src={items.profileURL} />
      </div>
      <div>
        <div>{items.firstName + " " + items.lastName}</div>
      </div>
      <button
        className="btn btn-secondary"
        onClick={() => reviewConnection("accepted", items._id)}>
        {options[0]}
      </button>
      <button
        className="btn btn-primary"
        onClick={() => reviewConnection("rejected", items._id)}>
        {options[1]}
      </button>
    </li>
  );
};

export default ProfileList;
