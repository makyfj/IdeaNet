import mongoose from "mongoose";

const ideaSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
  },
  userName: {
    type: String,
  },
});

const IdeaModel = mongoose.model("Idea", ideaSchema);

export default IdeaModel;
