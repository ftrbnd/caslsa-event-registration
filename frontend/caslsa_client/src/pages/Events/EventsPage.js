import React from "react";
import { useSelector } from "react-redux";
import { Event } from "../../components/Event/Event";
import { Header } from "../../components/Header/Header";
import "./EventsStyles.css";

function EventsPage() {
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="pageTitle">Events</h1>
        <div className="eventsSection">
          <h3>My events ({user.events.length})</h3>
          {user.events.length === 0 ? (
            <p className="noEvents">You don't have any event</p>
          ) : (
            user.events.map((event, index) => {
              return <Event key={index} isSubscribed={false} event={event} />;
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
    </div>
  );
}

export default EventsPage;
