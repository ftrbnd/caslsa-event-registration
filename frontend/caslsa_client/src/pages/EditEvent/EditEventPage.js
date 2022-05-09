import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { Header } from "../../components/Header/Header";
import "./EditEventStyles.css";
import illustration from "../../assets/surf.jpg";

function EditEventPage() {
  const ageGroupRef = useRef();
  const dateRef = useRef();
  const nameRef = useRef();
  const groupRef = useRef();

  const handleEdit = () => {};

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <h1>Edit event</h1>
            <div className="formRow">
              <h3 className="formInputTitle">Age group</h3>
              <TextField
                id="ageGroup"
                required
                label="Age group"
                variant="outlined"
                fullWidth
                inputRef={ageGroupRef}
              />
            </div>
            <div className="formRow">
              <h3 className="formInputTitle">Event group</h3>
              <TextField
                id="group"
                required
                label="Event group"
                variant="outlined"
                fullWidth
                inputRef={groupRef}
              />
            </div>
            <div className="formRow">
              <h3 className="formInputTitle">Event name</h3>
              <TextField
                id="name"
                required
                label="Event name"
                variant="outlined"
                fullWidth
                inputRef={nameRef}
              />
            </div>
            <div className="formRow">
              <h3 className="formInputTitle">Event date</h3>
              <TextField
                id="date"
                required
                label="Event date"
                variant="outlined"
                fullWidth
                inputRef={dateRef}
                type="datetime-local"
              />
            </div>

            <div className="formRow">
              <Button onClick={handleEdit} variant="contained" fullWidth>
                Create
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

export default EditEventPage;
