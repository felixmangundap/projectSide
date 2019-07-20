import express from 'express';
// import mongoose from 'mongoose';

import Users from '../schemas/users';

const router = express.Router();

const getUsers = (req, res) => {
  Users.find({}, (err, users) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ users });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  Users.find({ _id: id }, (err, user) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ user });
  });
};

const createUser = (req, res) => {
  const { user } = req.body;
  Users.create(user, (err) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ message: 'User Created Successfully' });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  Users.remove({ _id: id }, (err) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ message: 'User Deleted Successfully' });
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  Users.remove({ _id: id }, user, (err) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ message: 'User Updated Successfully' });
  });
};

router.get('/get', getUsers);
router.get('/get/:id', getUser);
router.post('/create', createUser);
router.delete('/remove/:id', deleteUser);
router.put('/update/:id', updateUser);

export default router;
