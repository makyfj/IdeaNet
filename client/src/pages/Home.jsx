import React, { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IdeaCard from "../components/IdeaCard";
import AddIdea from "../components/AddIdea";
import {
  clearIdea,
  clearState,
  getIdeas,
  addIdea,
  ideaSelector,
} from "../features/Idea/ideaSlice";
import { userSelector } from "../features/User/userSlice";
import ideaNet from "../assets/ideaNet.png";

const Home = () => {
  const dispatch = useDispatch();

  const { ideas, isFetching, isSuccess, isError, errorMessage } =
    useSelector(ideaSelector);

  const { userInfo } = useSelector(userSelector);

  useEffect(() => {
    dispatch(getIdeas());
  }, [dispatch]);

  return (
    <Box sx={{ m: 3 }}>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={3}>
          <img src={ideaNet} alt="ideaNet" height="150" width="150" />
        </Grid>
      </Grid>

      {userInfo.name && (
        <Box>
          <Typography
            variant="h4"
            align="center"
            color="text.primary"
            sx={{ m: 2, fontWeight: "bold" }}
          >
            Are you ready to make your idea?
          </Typography>

          <AddIdea />
        </Box>
      )}
      <Typography
        variant="h5"
        align="center"
        sx={{ pb: 2, fontWeight: "bold" }}
      >
        Ideas from community members
      </Typography>
      {isSuccess ? <IdeaCard ideas={ideas} /> : <p>Not ideas</p>}
    </Box>
  );
};

export default Home;
