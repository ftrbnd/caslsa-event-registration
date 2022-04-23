import React from "react";
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
            <a className="link" href="/home">
              Home
            </a>
            <a className="link" href="/events">
              Events
            </a>
            <a className="link" href="/profile">
              Profile
            </a>
            <a className="link" href="/">
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
