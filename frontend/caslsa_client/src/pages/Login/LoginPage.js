import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./LoginStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../redux/actionTypes/auth";
import { Navigate } from "react-router-dom";
import usePrevious from "../../hooks/usePrevious";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const { isLoadingLogin, errorLogin, token } = useSelector(
    (state) => state.auth
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const previousLoading = usePrevious(isLoadingLogin);

  useEffect(() => {
    if (previousLoading === true && !errorLogin && token) {
      setLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingLogin, errorLogin]);

  useEffect(() => {
    emailRef.current.value = "hugodegrouchy@gmail.com";
    passwordRef.current.value = "hugo1234";
  }, []);

  function onSignInPress() {
    dispatch({
      type: LOGIN,
      payload: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  }

  if (loggedIn) {
    return <Navigate to="/events" />;
  }

  return (
    <div className="loginPage">
      <h1>CASLSA</h1>
      <div className="loginForm">
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
          Sign In
        </Button>
        <Button fullWidth variant="text" href="/signup">
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
