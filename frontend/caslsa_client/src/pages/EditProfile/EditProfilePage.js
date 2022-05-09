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
import { Header } from "../../components/Header/Header";
import "./EditProfileStyles.css";
import illustration from "../../assets/surf.jpg";
import { EDIT_ACCOUNT } from "../../redux/actionTypes/user";
import usePrevious from "../../hooks/usePrevious";
import { Navigate } from "react-router-dom";
import moment from "moment";

function EditProfilePage() {
  const emailRef = useRef();
  const nameRef = useRef();
  const birthRef = useRef();

  const dispatch = useDispatch();
  const { user, isLoadingEdit, errorEdit } = useSelector((state) => state.user);

  const [editRedirect, setEditRedirect] = useState(false);
  const [gender, setGender] = useState("");
  const [memberType, setMemberType] = useState("");
  const [chapter, setChapter] = useState("");

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
    birthRef.current.value = user.birthdate ? moment(user.birthdate) : "";
    if (user.memberType) {
      setMemberType(user.memberType);
    }
    if (user.chapter) {
      setChapter(user.chapter);
    }
    if (user.gender) {
      setGender(user.gender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editProfile = () => {
    dispatch({
      type: EDIT_ACCOUNT,
      payload: {
        email: emailRef.current.value,
        name: nameRef.current.value,
        birthdate: birthRef.current.value,
        memberType: memberType,
        gender: gender,
        chapter: chapter,
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
            <h4 className="editProfileTitle">Date of Birth</h4>
            <TextField
              id="birthdate"
              required
              label="Date of Birth"
              variant="outlined"
              fullWidth
              inputRef={birthRef}
              type="date"
            />
            <h4 className="editProfileTitle">Gender</h4>
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
            <h4 className="editProfileTitle">Member Type</h4>

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
            <h4 className="editProfileTitle">Chapter</h4>
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
