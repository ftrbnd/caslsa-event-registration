import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import "./EventDetailsStyles.css";

function EventDetailsPage() {
  const { specificEvent } = useSelector((state) => state.events);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <h1>{specificEvent.eventName}</h1>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
