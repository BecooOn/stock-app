import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApiRequest from "../services/useApiRequest";

const UpdateUser = () => {
  const { user, email, password, firstName, lastName, _id } = useSelector(
    (state) => state.auth
  );

  const [info, setInfo] = useState({
    user: user || "",
    email: email || "",
    password: password || "",
    firstName: firstName || "",
    lastName: lastName || ""
  });

  const { getUser, updateUser } = useApiRequest();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setInfo({
      user,
      email,
      password,
      firstName,
      lastName,
    });
  }, [user, email, password, firstName, lastName]);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(info);
    updateUser(info,_id);
    setInfo({
        user:"",
        email:"",
        password:"",
        firstName:"",
        lastName:""
      });
  };

  return (
    <Box
      sx={{
        maxWidth: "650px",
        width: "300px",
        textAlign: "center",
        margin: "auto"
      }}
    >
      <div style={{ height: "40px" }}></div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="User Name"
            name="user"
            id="user"
            type="text"
            variant="outlined"
            value={info.user}
            onChange={handleChange}
          />
          <TextField
            label="First Name"
            name="firstName"
            id="firstName"
            type="text"
            variant="outlined"
            value={info.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            id="lastName"
            type="text"
            variant="outlined"
            value={info.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            id="email"
            type="email"
            variant="outlined"
            value={info.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            id="password"
            type="password"
            variant="outlined"
            value={info.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" size="large">
            UPDATE
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateUser;
