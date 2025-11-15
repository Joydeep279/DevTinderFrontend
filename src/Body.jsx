import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Nav";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  async function verifyLogin() {
    try {
      // If user already exists → don't call API again
      if (user?.data) return;

      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      // If unauthorized → redirect to login
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!user?.data) {
      verifyLogin();
    }
  }, [user?.data]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Body;
