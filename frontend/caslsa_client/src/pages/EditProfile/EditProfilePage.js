import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import "./EditProfileStyles.css";
import illustration from "../../assets/surf.jpg";
import store from "../../redux/store";
import { EDIT_ACCOUNT } from "../../redux/actionTypes/user";
import usePrevious from "../../hooks/usePrevious";
import { Navigate } from "react-router-dom";

function EditProfilePage() {
  const emailRef = useRef();
  const nameRef = useRef();

  const { user, isLoadingEdit, errorEdit } = useSelector((state) => state.user);

  const [editRedirect, setEditRedirect] = useState(false);

  const previousLoading = usePrevious(isLoadingEdit);

  useEffect(() => {
    if (previousLoading === true && !errorEdit) {
      setEditRedirect(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingEdit, errorEdit]);

  useEffect(() => {
    emailRef.current.value = user.email;
    nameRef.current.value = user.name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editProfile = () => {
    store.dispatch({
      type: EDIT_ACCOUNT,
      payload: {
        email: emailRef.current.value,
        name: nameRef.current.value,
      },
    });
  };

  if (editRedirect) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <h1 className="pageTitle">Edit profile</h1>
            <h4 className="editProfileTitle">Email</h4>
            <TextField
              id="email"
              required
              disabled
              label="Email"
              variant="outlined"
              fullWidth
              inputRef={emailRef}
              type="email"
            />
            <h4 className="editProfileTitle">Name</h4>
            <TextField
              id="name"
              required
              label="Name"
              variant="outlined"
              fullWidth
              inputRef={nameRef}
              type="name"
            />
            <div className="editProfileButton">
              <Button onClick={editProfile} variant="contained" fullWidth>
                Update
              </Button>
            </div>
          </div>
          <div className="col-12 offset-md-1 col-md-7">
            <img src={illustration} alt="surf" className="surfIllustration" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
