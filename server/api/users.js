const router = require('express').Router();
const { User } = require('../db');

router.get('/', (req, res, next) => { /* etc */});

router.get('/:id', async (req, res, next) => {})

router.post('/', function (req, res, next) { /* etc */});

router.put('/:userId', function (req, res, next) { /* etc */});

router.delete('/:userId', function (req, res, next) { /* etc */});

module.exports = router;
