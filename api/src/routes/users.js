import express from 'express';
// import mongoose from 'mongoose';

import Users from '../schemas/users';

const router = express.Router();

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
    res.json({ user: user[0] });
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  Users.updateOne({ _id: id }, user, (err) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ message: 'User Updated Successfully' });
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

router.post('/create', createUser);
router.get('/get', getUsers);
router.get('/get/:id', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
