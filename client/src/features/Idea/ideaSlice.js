import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.IDEA_NET_SERVER;

export const getIdeas = createAsyncThunk("ideas/getIdeas", async (thunkAPI) => {
  try {
    const { data, status } = await axios.get(`${URL}/api/ideas/all`);

    if (status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addIdea = createAsyncThunk(
  "ideas/addIdea",
  async ({ title, description }, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      };

      const { data, status } = await axios.post(
        `${URL}/api/ideas/idea`,
        { title, description },
        config
      );

      if (status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const getIdeaById = createAsyncThunk(
  "ideas/getIdeaById",
  async ({ id }, thunkAPI) => {
    try {
      const { data, status } = await axios.get(`${URL}/api/ideas/${id}`);

      if (status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      /* handle error */
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateIdea = createAsyncThunk(
  "ideas/updateIdea",
  async (idea, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();

      const { idea: currentIdea } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      };

      const { data, status } = await axios.put(
        `${URL}/api/ideas/${currentIdea.idea._id}`,
        idea,
        config
      );

      if (status === 200) {
        currentIdea.idea = idea;
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteIdea = createAsyncThunk(
  "ideas/deleteIdea",
  async ({ id }, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      };

      const { status } = await axios.delete(`${URL}/api/ideas/${id}`, config);

      if (status === 200) {
        return status;
      } else {
        return thunkAPI.rejectWithValue(status);
      }
    } catch (error) {
      /* handle error */
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  idea: {
    title: "",
    description: "",
    postedAt: "",
    user: "",
  },
  ideas: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },

    clearIdea: (state) => {
      state.idea.title = "";
      state.idea.description = "";
      state.idea.postedAt = "";

      return state;
    },
  },
  extraReducers: (builder) => {
    // ideas/getIdeas
    builder.addCase(getIdeas.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.ideas = payload;

      return state;
    });

    builder.addCase(getIdeas.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(getIdeas.rejected, (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    });

    // ideas/addIdea
    builder.addCase(addIdea.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.idea = payload;
      state.ideas.push(payload);

      return state;
    });

    builder.addCase(addIdea.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(addIdea.rejected, (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    });

    // ideas/getIdeaById
    builder.addCase(getIdeaById.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.idea = payload;

      return state;
    });

    builder.addCase(getIdeaById.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(getIdeaById.rejected, (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    });

    // ideas/updateIdea
    builder.addCase(updateIdea.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.idea = payload;

      return state;
    });

    builder.addCase(updateIdea.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(updateIdea.rejected, (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    });

    // ideas/deleteIdea
    builder.addCase(deleteIdea.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.idea = payload;

      return state;
    });

    builder.addCase(deleteIdea.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(deleteIdea.rejected, (state, { error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = error.message;
    });
  },
});

export const { clearState, clearIdea } = ideaSlice.actions;

export const ideaSelector = (state) => state.idea;

const ideaReducer = ideaSlice.reducer;

export default ideaReducer;
