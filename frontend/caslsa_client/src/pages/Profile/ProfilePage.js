import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./ProfileStyles.css";

function ProfilePage() {
  const { user } = useSelector((state) => state.user);

  const [navigateEdit, setNavigateEdit] = useState(false);

  const deleteAccount = () => {};

  const editAccount = () => {
    setNavigateEdit(true);
  };

  if (navigateEdit) {
    return <Navigate to="/editProfile" />;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 topContainer">
            <h1 className="pageTitle">Profile</h1>
            <div>
              <Button onClick={editAccount}>Edit</Button>
              <Button onClick={deleteAccount}>Delete</Button>
            </div>
          </div>
        </div>
        <div className="formRow">
          <h4>Name</h4>
          <p>{user.name}</p>
        </div>
        <div className="formRow">
          <h4>Email</h4>
          <p>{user.email}</p>
        </div>
        <div className="formRow">
          <h4>Roles</h4>
          {user.roles.map((role, index) => {
            return <p key={index}>{role}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
