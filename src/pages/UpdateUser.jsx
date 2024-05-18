import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApiRequest from "../services/useApiRequest";

const UpdateUser = () => {
  const { user, email, password, firstName, lastName, _id } = useSelector(
    (state) => state.auth
  );
  let username = user;
  // console.log(username);
  const { getUser, updateUser } = useApiRequest();
  const [info, setInfo] = useState({
    username: username || "",
    email: email || "",
    password: password || "",
    firstName: firstName || "",
    lastName: lastName || ""
  });

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(info,_id);
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
      <Typography
              variant="body1"
              color="red"
              textAlign="center"
              sx={{my:4,fontSize:"24px"}}
            >
              Change your informations
            </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="User Name"
            name="username"
            id="username"
            type="text"
            variant="outlined"
            value={info.username}
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
