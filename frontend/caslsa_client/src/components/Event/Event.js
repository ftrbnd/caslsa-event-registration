import React from "react";
import "./EventStyles.css";
import moment from "moment";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  SUBSCRIBE_EVENT,
  UNSUBSCRIBE_EVENT,
} from "../../redux/actionTypes/events";

export const Event = ({ event, isSubscribed }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleSubscribe = () => {
    dispatch({
      type: isSubscribed ? UNSUBSCRIBE_EVENT : SUBSCRIBE_EVENT,
      payload: {
        id: event._id,
      },
    });
  };

  if (!isSubscribed && event.users.includes(user._id)) {
    return null;
  }

  if (!event) {
    return null;
  }

  return (
    <div className="col-12 event">
      <p>
        {event.eventName} ({event.ageGroup})
      </p>
      <div className="d-flex align-items-center">
        {isSubscribed ? (
          <p>{moment(event.eventDate).format("MMMM Do YYYY")}</p>
        ) : (
          <p>
            {moment(event.eventDate).format("MMMM Do YYYY")} (
            {event.users.length} subscribers)
          </p>
        )}
        <Button onClick={handleSubscribe}>
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </div>
    </div>
  );
};
