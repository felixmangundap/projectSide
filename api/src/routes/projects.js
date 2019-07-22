import express from 'express';

import Projects from '../schemas/projects';
import Users from '../schemas/users';

const router = express.Router();

const createProject = (req, res) => {
  const { project } = req.body;
  const { ownerId } = project;

  Projects.create(project, (error, createdProject) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const userProject = { projectId: createdProject._id };

    Users.updateOne({ _id: ownerId }, { $push: { projects: userProject } }, (err, targetUser) => {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }

      if (!targetUser) {
        res.status(400).json({ error: 'User does not exist' });
        return;
      }

      res.json({ message: 'Project Created Successfully' });
    });
  });
};

const getProjects = (req, res) => {
  Projects.find({}, (error, projects) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    res.json({ projects });
  });
};

const getProject = (req, res) => {
  const { id } = req.params;
  Projects.find({ _id: id }, (error, projects) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const project = projects[0];
    res.json({ project });
  });
};

const updateProject = (req, res) => {
  const { id } = req.params;
  const { project } = req.body;
  Projects.updateOne({ _id: id }, project, (error, targetProject) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    if (!targetProject) {
      res.status(400).json({ error: 'Project does not exist' });
      return;
    }

    res.json({ message: 'Project Updated Successfully' });
  });
};

const deleteProject = (req, res) => {
  const { id } = req.params;
  Projects.remove({ _id: id }, (error, targetProject) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    if (!targetProject) {
      res.status(400).json({ error: 'Project does not exist' });
      return;
    }

    console.log(targetProject);
    const { _id, ownerId } = targetProject;

    Users.updateOne({ _id: ownerId }, { $pull: { projects: { projectId: _id } } }, (err, targetUser) => {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }

      if (!targetUser) {
        res.status(400).json({ error: 'User does not exist' });
        return;
      }

      res.json({ message: 'Project Deleted Successfully' });
    });
  });
};

router.post('/create', createProject);
router.get('/get', getProjects);
router.get('/get/:id', getProject);
router.put('/update/:id', updateProject);
router.delete('/delete/:id', deleteProject);

export default router;
