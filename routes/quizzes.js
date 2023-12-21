const express = require('express');
const router = express.Router();
const passport = require('passport');
const quizzesController = require('../controllers/quizzes_controller');

router.post('/endpoints', passport.authenticate('jwt', { session: false }), quizzesController.create);
router.get('/active', passport.authenticate('jwt', { session: false }), quizzesController.activeQuizzes);
router.get('/all', passport.authenticate('jwt', { session: false }), quizzesController.getAllQuizzes);

module.exports = router;