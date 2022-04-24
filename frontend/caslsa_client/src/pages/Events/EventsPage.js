import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Event } from "../../components/Event/Event";
import { Header } from "../../components/Header/Header";
import "./EventsStyles.css";

function EventsPage() {
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.user);

  const [redirectCreateEvent, setRedirectCreateEvent] = useState(false);

  const createEvent = () => {
    setRedirectCreateEvent(true);
  };

  if (redirectCreateEvent) {
    return <Navigate to="/createEvent" />;
  }

  return (
    <div>
      <Header />
      {events && user && (
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="pageTitle">Events</h1>
            {user.roles.includes("user") && (
              <Button variant="contained" onClick={createEvent}>
                Create event
              </Button>
            )}
          </div>
          <div className="eventsSection">
            <h3>My events ({user.events.length})</h3>
            {user.events.length === 0 ? (
              <p className="noEvents">You don't have any event</p>
            ) : (
              user.events.map((event, index) => {
                return <Event key={index} isSubscribed event={event} />;
              })
            )}
          </div>
          <div className="eventsSection">
            <h3>Events available ({events.length})</h3>
            {events.length === 0 ? (
              <p className="noEvents">No event for the moment</p>
            ) : (
              events.map((event, index) => {
                return <Event key={index} isSubscribed={false} event={event} />;
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
