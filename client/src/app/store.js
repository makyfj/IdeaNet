import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User/userSlice";
import ideaReducer from "../features/Idea/ideaSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    idea: ideaReducer,
  },
});

export default store;
