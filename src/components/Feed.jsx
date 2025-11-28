import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import FeedCard from "./FeedCard";
import { useNavigate } from "react-router-dom";

function Feed() {
  const [feedCardIndex, setFeedCardIndex] = useState(0);
  const feedData = useSelector((store) => store?.feed);
  const userInfo = useSelector((store) => store?.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [userInfo]);

  async function getFeed() {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addToFeed(res.data));
    } catch (error) {
      throw new Error("err: ", error.message);
    }
  }
  useEffect(() => {
    if (userInfo) {
      getFeed();
    }
  }, []);

  if (feedData === null) return <div>loading</div>;

  if (feedData.length === 0) {
    return <div>Out of Data</div>;
  }

  return (
    <div className="flex justify-center">
      <FeedCard
        userData={feedData[feedCardIndex]}
        feedCard={{ setFeedCardIndex, feedCardIndex }}
      />
    </div>
  );
}
export default Feed;
