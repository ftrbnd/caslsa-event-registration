import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-3 titleContainer">
            <p className="title">CASLSA</p>
          </div>
          <div className="col-9 linkContainer">
            <Link className="link" to="/events">
              Events
            </Link>
            {user.roles.includes("admin") && (
              <Link className="link" to="/users">
                Users
              </Link>
            )}
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
