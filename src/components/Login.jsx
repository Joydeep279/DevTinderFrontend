import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [email, setEmail] = useState("Babbage-@cs.us.edu");
  const [password, setPassword] = useState("Babbage@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.data);
  if (user) {
    navigate("/");
    return;
  }
  async function handleSubmit() {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <form
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto h-1/2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      {/* <legend className="fieldset-legend">Login</legend> */}
      <h2 className="text-2xl text-center">Login</h2>

      <label className="label">Email</label>
      <input
        type="email"
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label">Password</label>
      <input
        type="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-neutral mt-4">Login</button>
      <span className="cursor-pointer">already Signed In?</span>
    </form>
  );
}
export default Login;
