import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./LoginStyles.css";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { LOGIN } from "../../redux/actionTypes/auth";
import { Navigate } from "react-router-dom";
import usePrevious from "../../hooks/usePrevious";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();

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

  function onSignInPress() {
    store.dispatch({
      type: LOGIN,
      payload: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  }

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="loginPage">
      <h1>Authentification</h1>
      <div className="loginForm">
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
