import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import "./EventDetailsStyles.css";
import moment from "moment";
import { User } from "../../components/User/User";
import { Navigate } from "react-router-dom";

function EventDetailsPage() {
  const { specificEvent } = useSelector((state) => state.events);

  const [redirectEdit, setRedirectEdit] = useState(false);

  const handleEdit = () => {
    setRedirectEdit(true);
  };

  if (redirectEdit) {
    return <Navigate to="/edit-event" />;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h1>{specificEvent.eventName}</h1>
            <Button onClick={handleEdit}>Edit</Button>
          </div>
        </div>
        <div className="formRow">
          <h4>Age group</h4>
          <p>{specificEvent.ageGroup}</p>
        </div>
        <div className="formRow">
          <h4>Event name</h4>
          <p>{specificEvent.eventName}</p>
        </div>
        <div className="formRow">
          <h4>Event group</h4>
          <p>{specificEvent.eventGroup}</p>
        </div>
        <div className="formRow">
          <h4>Event date</h4>
          <p>{moment(specificEvent.eventDate).format("MMMM Do YYYY")}</p>
        </div>
        <div className="formRow">
          <h4>Registered users</h4>
          {specificEvent.users.length === 0 ? (
            <p className="noEvents">No user subscribed to this event</p>
          ) : (
            specificEvent.users.map((user, index) => {
              return <User user={user} key={index} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
