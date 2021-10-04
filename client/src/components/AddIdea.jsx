import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { addIdea } from "../features/Idea/ideaSlice";
import { useDispatch } from "react-redux";

const AddIdea = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addIdeaHandler = (e) => {
    e.preventDefault();
    dispatch(addIdea({ title, description }));

    if (title && description) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ pb: 4 }}
    >
      <form>
        <TextField
          sx={{ pb: 2 }}
          type="text"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          sx={{ pb: 2 }}
          type="text"
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
          onClick={addIdeaHandler}
        >
          Add Idea
        </Button>
      </form>
    </Stack>
  );
};

export default AddIdea;
