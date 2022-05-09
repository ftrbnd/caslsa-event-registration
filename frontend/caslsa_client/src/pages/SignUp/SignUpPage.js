import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

  const [gender, setGender] = useState("");
  const [memberType, setMemberType] = useState("");
  const [chapter, setChapter] = useState("");

  const birthdayRef = useRef();

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
        birthdate: birthdayRef.current.value,
        gender: gender,
        memberType: memberType,
        chapter: parseInt(chapter),
      },
    });
  }

  if (isRegister) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container loginPage">
      <div className="row">
        <h1 className="text-center col-12">Sign Up</h1>
        <div className="col-6">
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
        </div>
        <div className="col-6">
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
        </div>
        <div className="col-6">
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
        </div>

        <div className="col-6">
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
        <div className="col-6">
          <div className="formRow">
            <h3>Gender</h3>
            <FormControl fullWidth size="medium">
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                fullWidth
                labelId="gender-select-label"
                id="gender-select-label"
                label="Gender"
                onChange={(event) => setGender(event.target.value)}
                value={gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="col-6">
          <div className="formRow">
            <h3>Chapter</h3>
            <FormControl fullWidth size="medium">
              <InputLabel id="chapter-select-label">Chapter</InputLabel>
              <Select
                fullWidth
                labelId="chapter-select-label"
                id="chapter-select-label"
                label="Chapter"
                onChange={(event) => setChapter(event.target.value)}
                value={chapter}
              >
                <MenuItem value="168">
                  Aptos La Selva Fire Protection Dept.
                </MenuItem>
                <MenuItem value="179">Avila Beach</MenuItem>
                <MenuItem value="7">California State Lifeguard Assoc</MenuItem>
                <MenuItem value="10">Capitola Beach Lifeguard Assoc</MenuItem>
                <MenuItem value="12">Carpinteria</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="col-6">
          <div className="formRow">
            <h3>Member type</h3>
            <FormControl fullWidth size="medium">
              <InputLabel id="member-type-select-label">Member Type</InputLabel>
              <Select
                fullWidth
                labelId="member-type-select-label"
                id="member-type-select-label"
                label="Member Type"
                onChange={(event) => setMemberType(event.target.value)}
                value={memberType}
              >
                <MenuItem value="Professional Lifeguard">
                  Professional Lifeguard
                </MenuItem>
                <MenuItem value="Lifeguard Alumni">Lifeguard Alumni</MenuItem>
                <MenuItem value="Professional or Junior Guard">
                  Professional or Junior Guard
                </MenuItem>
                <MenuItem value="Junior Lifeguard">Junior Lifeguard</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="col-6">
          <div className="formRow">
            <h3>Date of birth</h3>
            <TextField
              id="date"
              required
              label="Date of birth"
              variant="outlined"
              fullWidth
              inputRef={birthdayRef}
              type="date"
            />
          </div>
        </div>
      </div>
      <div className="col-12 formRow loginButtons">
        <Button fullWidth onClick={onSignInPress} variant="contained">
          Sign Up
        </Button>
        <Button fullWidth variant="text" className="text-center" href="/">
          Already registered? Log in
        </Button>
      </div>
    </div>
  );
}

export default SignUpPage;
