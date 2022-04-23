import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import "./ProfileStyles.css";

function ProfilePage() {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  console.log(user);
  console.log(auth);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Profile</h1>
            <h1>{user.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
