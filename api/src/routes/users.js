import express from 'express';

import Users from '../schemas/users';

const router = express.Router();

const createUser = (req, res) => {
  const { user } = req.body;
  const { email } = user;

  Users.findOne({ email }, (err, targetUser) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }

    if (targetUser) {
      res.status(400).json({ error: 'The email address is already registered' });
      return;
    }

    Users.create(user, (error) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }

      res.json({ message: 'User Created Successfully' });
    });
  });
};

const getUsers = (req, res) => {
  Users.find({}, (error, users) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    res.json({ users });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  Users.find({ _id: id }, (error, users) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const user = users[0];
    res.json({ user });
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  Users.updateOne({ _id: id }, user, (error, targetUser) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    if (!targetUser) {
      res.status(400).json({ error: 'User does not exist' });
      return;
    }

    res.json({ message: 'User Updated Successfully' });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  Users.remove({ _id: id }, (error, targetUser) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    if (!targetUser) {
      res.status(400).json({ error: 'User does not exist' });
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
