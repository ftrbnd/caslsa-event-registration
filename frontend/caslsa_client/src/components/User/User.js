import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FORCE_UNSUBSCRIBE_EVENT } from "../../redux/actionTypes/events";
import { DELETE_ACCOUNT_ADMIN, EDIT_ROLE } from "../../redux/actionTypes/user";
import "./UserStyles.css";

export const User = ({ user }) => {
  const [roles, setRoles] = useState("");

  const { specificEvent } = useSelector((state) => state.events);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.roles) {
      if (user.roles.includes("admin")) {
        setRoles("admin");
      } else {
        setRoles("user");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (roles === "admin" && !user.roles.includes("admin")) {
      dispatch({
        type: EDIT_ROLE,
        payload: {
          email: user.email,
          roles: ["user", "admin"],
        },
      });
    }

    if (roles === "user" && user.roles.includes("admin")) {
      dispatch({
        type: EDIT_ROLE,
        payload: {
          email: user.email,
          roles: ["user"],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles]);

  const handleChangeRole = (event) => {
    setRoles(event.target.value);
  };

  const handleDelete = () => {
    dispatch({
      type: DELETE_ACCOUNT_ADMIN,
      payload: {
        email: user.email,
      },
    });
  };

  const handleRemove = () => {
    if (specificEvent) {
      dispatch({
        type: FORCE_UNSUBSCRIBE_EVENT,
        payload: {
          email: user.email,
          eventId: specificEvent.id,
        },
      });
    }
  };

  return (
    <div className="userContainer">
      <div className="d-flex align-items-center">
        <p className="userName">{user.name}</p>
        <p>{user.email}</p>
      </div>
      {user.roles ? (
        <div className="d-flex align-items-center">
          <div className="userSelect">
            <FormControl fullWidth>
              <InputLabel id="roles-simple-select-label">Role</InputLabel>

              <Select
                labelId="roles-simple-select-label"
                id="roles-simple-select"
                label="Roles"
                onChange={handleChangeRole}
                value={roles}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      ) : (
        <Button onClick={handleRemove}>Remove</Button>
      )}
    </div>
  );
};
