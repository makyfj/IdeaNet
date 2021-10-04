import React from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import {
  Card,
  CardActions,
  Typography,
  CardContent,
  Link as UILink,
} from "@mui/material";

const IdeaCard = ({ ideas }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {ideas.map((idea, index) => (
        <Card elevation={2} key={index}>
          <CardContent>
            <Typography variant="h5">{idea.title}</Typography>
            <Typography variant="body1">{idea.description}</Typography>
            <Typography variant="body2">{idea.postedAt}</Typography>
          </CardContent>
          <CardActions>
            <Typography align="right">
              User:{" "}
              <UILink
                component={Link}
                to={`/ideas/${idea._id}`}
                underline="none"
                align="center"
              >
                {idea.userName}
              </UILink>
            </Typography>
          </CardActions>
        </Card>
      ))}
    </Masonry>
  );
};

export default IdeaCard;
