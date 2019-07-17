import express from 'express';
// import mongoose from 'mongoose';

import Users from '../schemas/users';

const router = express.Router();

const getUsers = (req, res) => {
  const { id } = req.params;
  Users.find({ id }, (err, user) => {
    if (err) {
      res.json({ error: err });
    }
    res.json({ user });
  });
};

const getUser = (req, res) => {
  Users.find({}, (err, users) => {
    if (err) {
      res.json({ error: err });
    }
    res.json({ users });
  });
};

router.get('/get', getUsers);
router.get('/get/:id', getUser);
// router.post('/create', Heros.createHero);
// router.put('/update/:id', Heros.updateHero);
// router.delete('/remove/:id', Heros.removeHero);

export default router;
