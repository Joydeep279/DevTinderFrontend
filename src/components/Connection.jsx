import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
import ProfileList from "./ProfileList";

function Connection() {
  const dispatch = useDispatch();
  const connectionList = useSelector((store) => store.connection);
  async function getConnection() {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addToConnection(res.data));
  }

  useEffect(() => {
    getConnection();
  }, []);

  if (connectionList === null) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex justify-center">
      <ul className="list bg-base-100 rounded-box shadow-md w-1/2 flex gap-2.5">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Connections
        </li>
        {connectionList.map((items) => (
          <ProfileList
            items={items}
            options={["Remove", "Block"]}
            key={items._id}
          />
        ))}
      </ul>
    </div>
  );
}
export default Connection;
