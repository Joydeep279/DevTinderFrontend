import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

function Profile() {
  const { data } = useSelector((store) => store?.user);
  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [profileURL, setprofileURL] = useState(data?.profileURL);
  const [toastStatus, setToastStatus] = useState(false);

  const dispatch = useDispatch();

  async function handleSubmit() {
    try {
      setToastStatus(true);
      setTimeout(() => {
        setToastStatus(false);
      }, 1500);
      const updatedData = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          profileURL,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(updatedData.data.userData));
    } catch (error) {
      throw new Error("Oops something went wrong");
    }
  }

  return (
    <div className="flex flex-row items-center justify-center gap-5">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <h2 className="text-2xl text-center">Profile</h2>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e?.target?.value)}
        />
        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e?.target?.value)}
        />
        <label className="label">Image Url</label>
        <input
          type="text"
          className="input"
          placeholder="Image Url"
          value={profileURL}
          onChange={(e) => setprofileURL(e?.target?.value)}
        />
        <button className="btn btn-neutral mt-4">Save Profile</button>
      </form>
      <FeedCard
        userData={{ firstName, lastName, profileURL }}
        feedCard={{ setFeedCardIndex: null, feedCardIndex: null }}
      />
      {toastStatus && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Saved Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;
