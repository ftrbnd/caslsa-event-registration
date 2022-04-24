import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import { User } from "../../components/User/User";
import "./UsersStyles.css";

function UsersPage() {
  const { users } = useSelector((state) => state.user);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <h1>Users</h1>
          {users.map((user, index) => {
            return <User user={user} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
