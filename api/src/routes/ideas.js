import express from 'express';

import Ideas from '../schemas/ideas';
import Users from '../schemas/users';

const router = express.Router();

const createIdea = (req, res) => {
  const { idea } = req.body;
  const { ownerId } = idea;

  Ideas.create(idea, (error, createdIdea) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const userIdea = { ideaId: createdIdea._id };

    Users.updateOne({ _id: ownerId }, { $push: { ideas: userIdea } }, (err, targetUser) => {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }

      if (!targetUser) {
        res.status(400).json({ error: 'User does not exist' });
        return;
      }

      res.json({ message: 'Idea Created Successfully' });
    });
  });
};

const getIdeas = (req, res) => {
  Ideas.find({}, (error, ideas) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    res.json({ ideas });
  });
};

const getIdea = (req, res) => {
  const { id } = req.params;
  Ideas.find({ _id: id }, (error, ideas) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const idea = ideas[0];
    res.json({ idea });
  });
};

const updateIdea = (req, res) => {
  const { id } = req.params;
  const { idea } = req.body;
  Ideas.updateOne({ _id: id }, idea, (error, targetIdea) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    if (!targetIdea) {
      res.status(400).json({ error: 'Idea does not exist' });
      return;
    }

    res.json({ message: 'Idea Updated Successfully' });
  });
};

const deleteIdea = (req, res) => {
  const { id } = req.params;
  Ideas.remove({ _id: id }, (error, targetIdea) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    if (!targetIdea) {
      res.status(400).json({ error: 'Idea does not exist' });
      return;
    }

    Users.update({}, { $pull: { ideas: { ideaId: id } } }, (err, targetUser) => {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }

      if (!targetUser) {
        res.status(400).json({ error: 'User does not exist' });
        return;
      }

      res.json({ message: 'Idea Deleted Successfully' });
    });
  });
};

router.post('/create', createIdea);
router.get('/get', getIdeas);
router.get('/get/:id', getIdea);
router.patch('/update/:id', updateIdea);
router.delete('/delete/:id', deleteIdea);

export default router;
