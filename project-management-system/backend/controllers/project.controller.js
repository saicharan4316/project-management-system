
import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      createdBy: req.user.id
    });

    res.json(project);
  } catch {
    res.status(500).json({ msg: "Error creating project" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id });
    res.json(projects);
  } catch {
    res.status(500).json({ msg: "Error fetching projects" });
  }
};