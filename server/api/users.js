const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', (req, res, next) => { /* etc */});


router.get('/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      console.log('in the if !req.user block');
      res.sendStatus(403);
      return
    }
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch(err) {
    next(err);
  }
})

router.post('/', function (req, res, next) { /* etc */});

router.put('/:userId', function (req, res, next) { /* etc */});

router.delete('/:userId', function (req, res, next) { /* etc */});

module.exports = router;
