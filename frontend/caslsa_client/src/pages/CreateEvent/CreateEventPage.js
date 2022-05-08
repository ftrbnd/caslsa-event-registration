import React, { useEffect, useRef, useState } from "react";
import "./CreateEventStyles.css";
import { Header } from "../../components/Header/Header";
import { Button, TextField } from "@mui/material";
import illustration from "../../assets/surf.jpg";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_EVENT } from "../../redux/actionTypes/events";
import usePrevious from "../../hooks/usePrevious";
import { Navigate } from "react-router-dom";

function CreateEventPage() {
  const ageGroupRef = useRef();
  const dateRef = useRef();
  const nameRef = useRef();
  const groupRef = useRef();

  const dispatch = useDispatch();

  const { isLoadingCreate, errorCreate } = useSelector((state) => state.events);

  const previousLoading = usePrevious(isLoadingCreate);

  const [redirectCreate, setRedirectCreate] = useState(false);

  useEffect(() => {
    if (previousLoading === true && !errorCreate) {
      setRedirectCreate(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingCreate, errorCreate]);

  if (redirectCreate) {
    return <Navigate to="/events" />;
  }

  const handleCreate = () => {
    dispatch({
      type: CREATE_EVENT,
      payload: {
        ageGroup: ageGroupRef.current.value,
        eventName: nameRef.current.value,
        eventGroup: groupRef.current.value,
        eventDate: dateRef.current.value,
      },
    });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <h1>Create Event</h1>
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
              <Button onClick={handleCreate} variant="contained" fullWidth>
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

export default CreateEventPage;
