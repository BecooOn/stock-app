import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApiRequest from "../services/useApiRequest";

const UpdateUser = () => {
  const { user, email, password, firstName, lastName, _id } = useSelector(
    (state) => state.auth
  );

  const { getUser, updateUser, deleteUser } = useApiRequest();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if (userData) {
        setInfo({
          username: userData.user || "",
          email: userData.email || "",
          password: userData.password || "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
        });
      }
    };

    fetchUser();
  }, [getUser]);

  useEffect(() => {
    setInfo({
      username: user || "",
      email: email || "",
      password: password || "",
      firstName: firstName || "",
      lastName: lastName || "",
    });
  }, [user, email, password, firstName, lastName]);
  const [info, setInfo] = useState({
    username: user || "",
    email: email || "",
    password: password || "",
    firstName: firstName || "",
    lastName: lastName || "",
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(info, _id);
  };

  return (
    <Box
      sx={{
        maxWidth: "500px",
        textAlign: "center",
        margin: "auto",
        p: 1,
      }}
    >
      <Typography
        variant="body1"
        color="red"
        textAlign="center"
        sx={{ my: 4, fontSize: "24px" }}
      >
        You can add and change your informations
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: "2px solid white",
            p: 4,
            backgroundColor: "#e4cbcb",
          }}
        >
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
      <Typography
        component="button"
        sx={{
          m: 3,
          color: "gray",
          borderBottom: "1px solid gray",
          "&:hover": { color: "red", borderBottom: "2px solid red" },
        }}
        onClick={() => deleteUser(_id)}
      >
        Delete your account
      </Typography>
    </Box>
  );
};

export default UpdateUser;
