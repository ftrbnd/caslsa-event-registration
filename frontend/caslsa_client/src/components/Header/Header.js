import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-3 titleContainer">
            <p className="title">CALSA</p>
          </div>
          <div className="col-9 linkContainer">
            <Link className="link" to="/events">
              Events
            </Link>
            <Link className="link" to="/profile">
              Profile
            </Link>
            <Link className="link" to="/">
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
