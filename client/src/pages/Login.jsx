import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Input,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  userSelector,
  clearState,
  loginUser,
} from "../features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }
  }, [isSuccess, dispatch, clearState, history]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h6"
        component="h3"
        align="center"
        color="primary"
        sx={{ pb: 2 }}
      >
        Welcome back :)
      </Typography>
      {isError && (
        <Typography
          variant="h7"
          component="h3"
          align="center"
          color="error"
          sx={{ pb: 2 }}
        >
          {errorMessage}
        </Typography>
      )}
      {isFetching && <Loader />}

      <Stack direction="row" justifyContent="center" alignItems="center">
        <form onSubmit={(e) => e.preventDefault()}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                sx={{ pb: 2 }}
                label="Email"
                type="email"
                required
                fullWidth
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            required
            render={({ field }) => (
              <TextField
                sx={{ pb: 2 }}
                label="Password"
                type="password"
                required
                fullWidth
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            Log In
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default Login;
