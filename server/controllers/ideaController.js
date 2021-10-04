import asyncHandler from "express-async-handler";
import IdeaModel from "../models/ideaModel.js";

// @decs    Get all ideas
// @route   GET /api/ideas/all
// @access  Public
const getIdeas = asyncHandler(async (req, res) => {
  // Returns all ideas
  const ideas = await IdeaModel.find({});

  if (ideas) {
    res.status(200).json(ideas);
  } else {
    res.status(400);
    throw new Error("There are not ideas available");
  }
});

// @desc    Add an idea
// @route   POST /api/ideas/idea
// @access  Private
const addIdea = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const newIdea = await IdeaModel.create({
    user: req.user._id,
    title,
    description,
    postedAt: Date.now(),
    userName: req.user.name,
  });

  if (newIdea) {
    res.status(201).json(newIdea);
  } else {
    res.status(40);
    throw new Error("No idea created");
  }
});

// @desc    Get idea by id
// @route   GET /api/ideas/:id
// @access  Public
const getIdea = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const idea = await IdeaModel.findById(id);

  if (idea) {
    res.status(200).json(idea);
  } else {
    res.status(400);
    throw new Error("Couldn't find the idea");
  }
});

// @desc    Update idea by id
// @route   PUT /api/ideas/:id
// @access  Private
const updateIdea = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const idea = await IdeaModel.findById(id);

  if (idea) {
    idea.title = req.body.title || idea.title;
    idea.description = req.body.description || idea.description;
    idea.postedAt = Date.now();

    // Save idea
    const updatedIdea = await idea.save();

    res.json({
      _id: updatedIdea._id,
      title: updatedIdea.title,
      description: updatedIdea.description,
      postedAt: updatedIdea.postedAt,
    });
  } else {
    res.status(404);
    throw new Error("Idea not found");
  }
});

// @desc    Delete idea by id
// @route   DELETE /api/ideas/:id
// @access  Private
const deleteIdea = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const idea = await IdeaModel.findById(id);

  if (idea) {
    // Delete idea
    await idea.deleteOne({ _id: idea._id });
    res.json({ message: "Idea removed" });
  } else {
    res.status(404);
    throw new Error("Idea not found");
  }
});

export { getIdeas, addIdea, getIdea, updateIdea, deleteIdea };
