import React, { useState, useEffect } from "react";
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import {
  ideaSelector,
  updateIdea,
  getIdeaById,
  getIdeas,
  deleteIdea,
  clearIdea,
} from "../features/Idea/ideaSlice";
import { userSelector } from "../features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Idea = ({ match }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector(userSelector);
  const { idea, isSuccess, isFetching } = useSelector(ideaSelector);

  let ideaId = match.params;

  useEffect(() => {
    dispatch(getIdeaById(ideaId));

    setTitle(idea.title);
    setDescription(idea.description);
  }, [dispatch, isSuccess, ideaId]);

  const updateIdeaHandler = (e) => {
    e.preventDefault();
    dispatch(updateIdea({ ideaId, title, description }));
    dispatch(clearIdea());
    ideaId = match.params;
    dispatch(getIdeaById(ideaId));
    setTitle(idea.title);
    setDescription(idea.description);
  };

  const deleteIdeaHandler = (e) => {
    e.preventDefault();
    dispatch(deleteIdea(ideaId));
    history.push("/");
    setTitle("");
    setDescription("");
    dispatch(clearIdea());
    dispatch(getIdeas());
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography
        align="center"
        variant="h4"
        color="text.primary"
        sx={{ mb: 2 }}
      >
        One of our best ideas :)
      </Typography>
      <Typography align="center" sx={{ mb: 2 }}>
        Idea owned by: {idea.userName}
      </Typography>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <form>
          <TextField
            sx={{ mb: 2 }}
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            sx={{ mb: 2 }}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            required
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={updateIdeaHandler}
            disabled={userInfo._id === idea.user ? false : true}
          >
            Update your idea!
          </Button>
          <Button
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={deleteIdeaHandler}
            disabled={userInfo._id === idea.user ? false : true}
          >
            Delete Iea
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default Idea;
