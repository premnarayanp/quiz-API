const express = require('express');
const router = express.Router();
console.log('router loaded');

router.use('/users', require('./users'));
router.use('/quizzes', require('./quizzes'));
module.exports = router;