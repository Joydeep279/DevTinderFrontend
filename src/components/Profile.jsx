import { useSelector } from "react-redux";

function Profile() {
  const { data } = useSelector((store) => store?.user);

  return (
    <div className="flex flex-col items-center w-screen">
      <img
        src={data?.profileURL}
        alt="profile"
        className="w-20 h-20 rounded-full"
      />
      <h1>{data?.firstName}</h1>
      <h1>{data?.email}</h1>
    </div>
  );
}
export default Profile;
