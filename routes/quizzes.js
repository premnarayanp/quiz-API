const express = require('express');
const router = express.Router();
const passport = require('passport');
const cron = require("node-cron");

const quizzesController = require('../controllers/quizzes_controller');
router.post('/endpoints', passport.authenticate('jwt', { session: false }), quizzesController.create);
router.get('/active', passport.authenticate('jwt', { session: false }), quizzesController.activeQuizzes);
router.get('/all', passport.authenticate('jwt', { session: false }), quizzesController.getAllQuizzes);
router.get('/:quiz_id/result', passport.authenticate('jwt', { session: false }), quizzesController.getQuizResult);

//Schedule cron job every 5 minutes to create/update results
let job = new cron.schedule('*/5 * * * *', () => {
    quizzesController.createResults();
});
job.start()

module.exports = router;