import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileURL, setProfileURL] = useState(
    "https://cdn-icons-png.flaticon.com/512/456/456283.png"
  );

  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);

  // 🔥 REDIRECT IF ALREADY LOGGED IN (correct useEffect)
  useEffect(() => {
    if (user?.data) navigate("/");
  }, [user, navigate]);

  // 🔥 HANDLE LOGIN / SIGNUP FORM SUBMISSION
  async function handleSubmit() {
    try {
      let response;

      if (isSignUp) {
        response = await axios.post(
          BASE_URL + "/signup",
          { email, password, profileURL, firstName, lastName },
          { withCredentials: true }
        );
      } else {
        response = await axios.post(
          BASE_URL + "/login",
          { email, password },
          { withCredentials: true }
        );
      }

      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login/Signup failed!");
    }
  }

  return (
    <form
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto h-1/2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      <h2 className="text-2xl text-center">{isSignUp ? "Sign Up" : "Login"}</h2>

      {isSignUp && (
        <>
          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Profile URL</label>
          <input
            type="text"
            className="input"
            placeholder="Profile URL"
            value={profileURL}
            onChange={(e) => setProfileURL(e.target.value)}
          />
        </>
      )}

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

      <button className="btn btn-neutral mt-4">
        {isSignUp ? "Sign Up" : "Login"}
      </button>

      <span
        className="cursor-pointer mt-2 block text-sm text-center"
        onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Click to Login"
          : "New here? Click to Sign Up"}
      </span>
    </form>
  );
}

export default Login;
