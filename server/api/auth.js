const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      console.log(`${req.body.email} not found.`);
      res.status(401).send('Wrong username.')
    } else if (!user.correctPassword(req.body.password)) {
      console.log(`Incorrect password for ${req.body.email}.`);
      res.status(401).send('Wrong password.');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch(err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists.');
    } else {
      next(err);
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});
