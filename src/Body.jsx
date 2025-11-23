import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import Footer from "./components/Footer";

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user?.data);

  const [isLoading, setIsLoading] = useState(true); // Track verification state

  async function verifyLogin() {
    // If we already have user data in Redux (e.g. from previous session), skip API
    if (user) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      // Only redirect to login if not already there
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    verifyLogin();
    // Run only once on mount — remove `user` from dependencies
  }, []); // ← Critical fix: empty dependency array

  // Show a loader or nothing while verifying auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div> {/* Or your fancy spinner */}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="h-[90dvh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Body;
