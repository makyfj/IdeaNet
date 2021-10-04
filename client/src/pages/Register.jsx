import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  registerUser,
  userSelector,
  clearState,
} from "../features/User/userSlice";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Errors
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const submitHandler = (e) => {
    e.preventDefault();

    setNameError(false);
    setPasswordError(false);
    setEmailError(false);

    if (name === "") {
      setNameError(true);
    }

    if (email === "") {
      setEmailError(true);
    }

    if (password === "") {
      setPasswordError(true);
    }

    if (name && email && password) {
      dispatch(registerUser({ name, password, email }));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }
  }, [isSuccess, history, dispatch, clearState]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        align="center"
        variant="h6"
        color="primary"
        component="h3"
        sx={{ pb: 2 }}
      >
        Enter your information
      </Typography>
      {isError && (
        <Typography
          align="center"
          color="error"
          variant="h7"
          component="h3"
          sx={{ pb: 2 }}
        >
          {errorMessage}
        </Typography>
      )}
      {isFetching && <Loader />}

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
            error={nameError}
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
            error={emailError}
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
            error={passwordError}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={submitHandler}
          >
            Register
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default Register;
