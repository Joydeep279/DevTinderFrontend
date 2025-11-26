import React from "react";

const ProfileList = ({ items, options }) => {
  return (
    <li className="list-row" >
      <div>
        <img className="size-10 rounded-box" src={items.profileURL} />
      </div>
      <div>
        <div>{items.firstName + " " + items.lastName}</div>
      </div>
      <button className="btn btn-secondary">{options[0]}</button>
      <button className="btn btn-primary">{options[1]}</button>
    </li>
  );
};

export default ProfileList;
