import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.IDEA_NET_SERVER;

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(`${URL}/api/users/register`, {
        name,
        email,
        password,
      });

      if (status === 201) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        return { ...data, name: name, email: email };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      /* handle error */
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(`${URL}/api/users/login`, {
        email,
        password,
      });

      if (status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      /* handle error */
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("userInfo");
});

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (userInfo, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();

      // Get user token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      };

      const { data, status } = await axios.get(
        `${URL}/api/users/${userInfo._id}`,
        config
      );

      // If status is OK
      if (status === 200) {
        localStorage.getItem("userInfo", data.userInfo);
        // Add token to data
        data.token = user.userInfo.token;
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (user, thunkAPI) => {
    try {
      // Giving a different name otherwise there would be two user identifiers
      const { user: userLogin } = thunkAPI.getState();
      // Get user token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };

      const { data, status } = await axios.put(
        `${URL}/api/users/profile`,
        user,
        config
      );

      // If status is OK
      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async ({ id }, thunkAPI) => {
    try {
      const { data, status } = await axios.get(`${URL}/api/users/${id}`);

      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "users/deleteUserAccount",
  async (userInfo, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      };

      const { status } = await axios.delete(
        `${URL}/api/users/${userInfo._id}`,
        config
      );

      if (status === 200) {
        localStorage.removeItem("userInfo");
        return status;
      } else {
        return thunkAPI.rejectWithValue(status);
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  userInfo: {
    name: "",
    email: "",
  },
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    clearUserInfo: (state) => {
      state.userInfo = {};
      return state;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userInfo = payload;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });

    // Login
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userInfo = payload;

      return state;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });

    // Logout
    // Empty atm

    // userDetails
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userInfo = payload;

      return state;
    });

    builder.addCase(getUserDetails.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(getUserDetails.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });

    // updateUserProfile
    builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userInfo = payload;

      return state;
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(updateUserProfile.rejected, (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    });

    // getUserById
    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userInfo.name = payload.name;
      return state;
    });

    builder.addCase(getUserById.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(getUserById.rejected, (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    });

    // deleteUserAccount
    builder.addCase(deleteUserAccount.fulfilled, (state) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });

    builder.addCase(deleteUserAccount.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(deleteUserAccount.rejected, (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    });
  },
});

export const { clearState, clearUserInfo } = userSlice.actions;

export const userSelector = (state) => state.user;

const userReducer = userSlice.reducer;

export default userReducer;
