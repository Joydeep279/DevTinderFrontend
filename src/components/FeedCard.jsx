function FeedCard({ userData, feedCard }) {
  const { firstName, lastName, profileURL } = userData;

  let { setFeedCardIndex, feedCardIndex } = feedCard;

  function increamentCard() {
    const nextIndex = feedCardIndex + 1;
    setFeedCardIndex(nextIndex);
  }

  return (
    <div className="card bg-base-200 w-80 shadow-sm justify-center mx-1 my-1.5">
      <figure>
        <img src={profileURL} alt="profile" className="w-60 h-80 rounded-2xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {!(setFeedCardIndex || feedCardIndex) ? null : (
          <div className="card-actions justify-end" onClick={increamentCard}>
            <button className="btn btn-secondary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default FeedCard;
