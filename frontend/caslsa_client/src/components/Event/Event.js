import React, { useEffect, useState } from "react";
import "./EventStyles.css";
import moment from "moment";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_EVENT,
  GET_SPECIFIC_EVENT,
  SUBSCRIBE_EVENT,
  UNSUBSCRIBE_EVENT,
} from "../../redux/actionTypes/events";
import usePrevious from "../../hooks/usePrevious";
import { Navigate } from "react-router-dom";

export const Event = ({ event, isSubscribed }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoadingSpecific, errorSpecific, specificEvent } = useSelector(
    (state) => state.events
  );

  const [redirectEventDetails, setRedirectEventDetails] = useState(false);

  const previousLoading = usePrevious(isLoadingSpecific);

  useEffect(() => {
    if (previousLoading === true && !errorSpecific && specificEvent) {
      setRedirectEventDetails(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingSpecific, errorSpecific]);

  const handleSubscribe = () => {
    dispatch({
      type: isSubscribed ? UNSUBSCRIBE_EVENT : SUBSCRIBE_EVENT,
      payload: {
        id: event._id,
      },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: DELETE_EVENT,
      payload: {
        id: event._id,
      },
    });
  };

  const handleEventClick = () => {
    if (user.roles.includes("admin")) {
      dispatch({
        type: GET_SPECIFIC_EVENT,
        payload: {
          id: event._id,
        },
      });
    }
  };

  if (redirectEventDetails) {
    return <Navigate to="/event" />;
  }

  if (!isSubscribed && event.users.includes(user._id)) {
    return null;
  }

  if (!event) {
    return null;
  }

  return (
    <div className="col-12 event" onClick={handleEventClick}>
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
        {user.roles.includes("admin") && (
          <Button onClick={handleDelete}>Delete</Button>
        )}
      </div>
    </div>
  );
};
