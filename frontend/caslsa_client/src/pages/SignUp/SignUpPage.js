import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { REGISTER } from "../../redux/actionTypes/auth";
import "./SignUpStyles.css";

function SignUpPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();

  const dispatch = useDispatch();

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

  return (
    <div className="loginPage">
      <h1>Sign Up</h1>
      <div className="loginForm">
        <h3>First Name</h3>
        <TextField
          required
          label="First name"
          variant="outlined"
          fullWidth
          inputRef={firstnameRef}
        />
        <h3>Last Name</h3>
        <TextField
          required
          label="Last name"
          variant="outlined"
          fullWidth
          inputRef={lastnameRef}
        />
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
      <div className="loginButtons">
        <Button fullWidth onClick={onSignInPress} variant="contained">
          Sign Up
        </Button>
        <Button fullWidth variant="text" href="/">
          Already an account ? Log in
        </Button>
      </div>
    </div>
  );
}

export default SignUpPage;
