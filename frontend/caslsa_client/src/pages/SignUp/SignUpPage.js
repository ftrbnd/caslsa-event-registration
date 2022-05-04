import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import usePrevious from "../../hooks/usePrevious";
import { REGISTER } from "../../redux/actionTypes/auth";
import "./SignUpStyles.css";

function SignUpPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();

  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false);

  const { isLoadingRegister, errorRegister } = useSelector(
    (state) => state.auth
  );

  const previousLoading = usePrevious(isLoadingRegister);

  useEffect(() => {
    if (previousLoading === true && !errorRegister) {
      setIsRegister(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingRegister, errorRegister]);

  function onSignInPress() {
    dispatch({
      type: REGISTER,
      payload: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: firstnameRef.current.value + " " + lastnameRef.current.value,
      },
    });
  }

  if (isRegister) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <div className="row loginPage">
        <h1 className="text-center">Sign Up</h1>
        <div className="loginForm">
          <div className="formRow">
            <h3>First Name</h3>
            <TextField
              required
              label="First name"
              variant="outlined"
              fullWidth
              inputRef={firstnameRef}
            />
          </div>
          <div className="formRow">
            <h3>Last Name</h3>
            <TextField
              required
              label="Last name"
              variant="outlined"
              fullWidth
              inputRef={lastnameRef}
            />
          </div>

          <div className="formRow">
            <h3>E-mail</h3>
            <TextField
              id="email"
              required
              label="Email"
              variant="outlined"
              fullWidth
              inputRef={emailRef}
              type="email"
            />
          </div>

          <div className="formRow">
            <h3>Password</h3>
            <TextField
              size="medium"
              required
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              inputRef={passwordRef}
              type="password"
            />
          </div>
        </div>
        <div className="loginButtons">
          <Button fullWidth onClick={onSignInPress} variant="contained">
            Sign Up
          </Button>
          <Button fullWidth variant="text" className="text-center" href="/">
            Already an account ? Log in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
