import React from "react";
import "./EventStyles.css";
import moment from "moment";
import { Button } from "@mui/material";

export const Event = ({ event, isSubscribed }) => {
  return (
    <div className="col-12 event">
      <p>
        {event.eventName} ({event.ageGroup})
      </p>
      <div className="d-flex align-items-center">
        <p>
          {moment(event.eventDate).format("MMMM Do YYYY")} ({event.users.length}{" "}
          subscribers)
        </p>
        <Button>{isSubscribed ? "Unsubscribe" : "Subscribe"}</Button>
      </div>
    </div>
  );
};
