import axios from "axios";
import { BASE_URL } from "../utils/constants";

function FeedCard({ userData, feedCard }) {
  const { firstName, lastName, profileURL, _id } = userData;

  let { setFeedCardIndex, feedCardIndex } = feedCard;

  function increamentCard() {
    const nextIndex = feedCardIndex + 1;
    setFeedCardIndex(nextIndex);
  }

  async function reviewRequest(status, id) {
    await axios.post(
      BASE_URL + "/request/" + status + "/" + id,
      {},
      {
        withCredentials: true,
      }
    );
    increamentCard();
  }

  return (
    <div className="card bg-base-200 w-80 shadow-sm justify-center mx-1 my-1.5">
      <figure>
        <img src={profileURL} alt="profile" className="w-60 h-80 rounded-2xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {!(setFeedCardIndex || feedCardIndex) ? null : (
          <div className="card-actions justify-end">
            <button
              className="btn btn-secondary"
              onClick={() => reviewRequest("ignored", _id)}>
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => reviewRequest("interested", _id)}>
              Interested
            </button>
            <button className="btn btn-soft" onClick={() => increamentCard()}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default FeedCard;
