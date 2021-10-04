import React, { useEffect, useState } from "react";
import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  userSelector,
  clearState,
  clearUserInfo,
  getUserDetails,
  updateUserProfile,
  deleteUserAccount,
} from "../features/User/userSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const { isFetching, isSuccess, isError, errorMessage, userInfo } =
    useSelector(userSelector);

  // Dispatch updateUserProfile
  const updateProfileHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
  };

  const deleteAccountHandler = (e) => {
    e.preventDefault();
    dispatch(deleteUserAccount(userInfo));
    dispatch(clearState());
    dispatch(clearUserInfo());
    history.push("/");
  };

  useEffect(() => {
    if (!userInfo.name) {
      history.push("/login");
    } else {
      dispatch(getUserDetails(userInfo));
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [history, dispatch, getUserDetails]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        align="center"
        variant="h4"
        color="text.primary"
        sx={{ pb: 2 }}
      >
        User Profile
      </Typography>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <form>
          <TextField
            sx={{ pb: 2 }}
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            sx={{ pb: 2 }}
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            sx={{ pb: 2 }}
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={updateProfileHandler}
          >
            Update Information
          </Button>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
            onClick={deleteAccountHandler}
          >
            Delete My Account
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default Profile;
