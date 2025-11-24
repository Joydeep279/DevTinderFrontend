import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

function Connection() {
  const dispatch = useDispatch();
  const connectionList = useSelector((store) => {
    store.connection;
  });
  async function getConnection() {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addToConnection(res.data));
  }

  useEffect(() => {
    getConnection();
  }, []);
  console.log(connectionList);
  return (
    <div className="flex justify-center">
      <ul className="list bg-base-100 rounded-box shadow-md w-1/2 flex gap-2.5">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Connections
        </li>

        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Remaining Reason
            </div>
          </div>
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </li>
        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Remaining Reason
            </div>
          </div>
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </li>
      </ul>
    </div>
  );
}
export default Connection;
