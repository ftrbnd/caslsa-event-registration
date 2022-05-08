import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import usePrevious from "../../hooks/usePrevious";
import { DELETE_ACCOUNT } from "../../redux/actionTypes/user";
import "./ProfileStyles.css";

function ProfilePage() {
  const { user, isLoadingDelete, errorDelete } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [navigateEdit, setNavigateEdit] = useState(false);
  const [navigateLogin, setNavigateLogin] = useState(false);

  const previousLoading = usePrevious(isLoadingDelete);

  useEffect(() => {
    if (previousLoading === true && !errorDelete) {
      setNavigateLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingDelete, errorDelete]);

  const deleteAccount = () => {
    dispatch({
      type: DELETE_ACCOUNT,
    });
  };

  const editAccount = () => {
    setNavigateEdit(true);
  };

  if (navigateEdit) {
    return <Navigate to="/editProfile" />;
  }

  if (navigateLogin) {
    return <Navigate to="/" />;
  }

  console.log(user);

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
          <h4>Date of Birth</h4>
          {user.birthdate}
        </div>
        <div className="formRow">
          <h4>Email</h4>
          <p>{user.email}</p>
        </div>
        <div className="formRow">
          <h4>Role</h4>
          {user.roles.map((role, index) => {
            return <p key={index}>{role}</p>;
          })}
        </div>
        <div className="formRow">
          <h4>Chapter</h4>
          {user.roles.map((role, index) => {
            return <p key={index}>{role}</p>;
          })}
        </div>

        <div className="formRow">
          <h4>Member Type</h4>
          {user.memberType}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
