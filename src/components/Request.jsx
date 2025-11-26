import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addToRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileList from "./ProfileList";

const Request = () => {
  const dispatch = useDispatch();
  const requestList = useSelector((store) => store.request);

  async function getRequest() {
    const res = await axios.get(BASE_URL + "/user/requests", {
      withCredentials: true,
    });
    dispatch(addToRequest(res.data));
  }

  useEffect(() => {
    getRequest();
  }, []);

  if (requestList === null) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex justify-center">
      {!requestList.length ? (
        <span className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          No Request Found!
        </span>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md w-1/2 flex gap-2.5">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Requests
          </li>
          {requestList.map((items) => (
            <ProfileList
              items={items}
              options={["Ignore", "Interested"]}
              key={items._id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Request;
