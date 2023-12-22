const Quiz = require('../models/quiz');
const Result = require('../models/result');

//---------Create a Quiz--------------
module.exports.create = async function(req, res) {
    const body = req.body;

    //check req body
    if (!body.question || !body.options || !body.rightAnswer || !body.startDate || !body.endDate) {
        return res.json({ success: false, msg: "please fill all fields of quiz..", data: null });
    }

    if (!getDateValidation(body.startDate, body.endDate)) {
        return res.json({ success: false, msg: "please fill fully valid date in ISO format..", data: null });
    }

    try {
        const quiz = await Quiz.create({...body, isActiveQuiz: true, user: req.user._id });
        return res.json({ success: true, msg: "Quiz successfully created", data: { quiz: quiz } });

    } catch (error) {
        //console.log('error in creating Quiz..', error);
        return res.json({ success: false, msg: "Internal Server Error", data: null });
    }
}

//ISO format date validator
function getDateValidation(startDate, endDate) {
    try {
        if (new Date(startDate).toISOString() == startDate && new Date(endDate).toISOString() == endDate) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

// Retrieve activeQuizzes
module.exports.activeQuizzes = async function(req, res) {
    try {
        const quizzes = await Quiz.find({ user: req.user._id, isActiveQuiz: true });
        if (quizzes) {
            return res.json({ success: true, msg: "Active quizzes successfully found", data: { quizzes: quizzes } });
        } else {
            return res.json({ success: true, msg: "Nothing found any active quiz", data: null });
        }


    } catch (error) {
        //console.log("============error=============", error);
        return res.json({ success: false, msg: "Internal server Error..", data: null });
    }

}

// Retrieve All Quizzes
module.exports.getAllQuizzes = async function(req, res) {
    try {
        const quizzes = await Quiz.find({ user: req.user._id });
        if (quizzes) {
            return res.json({ success: true, msg: "All quizzes successfully found", data: { quizzes: quizzes } });
        } else {
            return res.json({ success: true, msg: "Nothing found any quiz", data: null });
        }


    } catch (error) {
        //console.log("============error=============", error);
        return res.json({ success: false, msg: "Internal server Error..", data: null });
    }

}

//create/Update results using node-cron
module.exports.createResults = async function(req, res) {
    try {
        const quizzes = await Quiz.find({ isActiveQuiz: true });
        if (quizzes) {
            quizzes.forEach(async(quiz) => {
                //Remain time to end this quiz according endDate
                const remainingTime = getRemainingTime(quiz.endDate);
                console.log("remainingTime", remainingTime);
                if (remainingTime.day == 0 && remainingTime.hours == 0 && remainingTime.minutes * 60 + remainingTime.seconds <= 0) {

                    const result = await Result.create({
                        pass: true,
                        totalQuestions: 1,
                        rightAnswer: quiz.rightAnswer,
                        quiz: quiz._id,
                        user: quiz.user,
                    });
                    //console.log("result", result);
                    quiz.isActiveQuiz = false;
                    quiz.result = result._id;
                    quiz.save();
                }
            });
        }

    } catch (error) {

    }

}

//get minutes,second,hour from ISO string and current time  different
function getRemainingTime(isoDateString) {
    try {
        const currentDate = new Date();
        const date = new Date(isoDateString);

        const day = date.getUTCDate() - currentDate.getDate();
        //console.log("day=", day);
        const hours = date.getUTCHours() - currentDate.getHours();
        const minutes = date.getUTCMinutes() - currentDate.getMinutes();
        const seconds = date.getUTCSeconds() - currentDate.getSeconds();
        return {
            day,
            hours,
            minutes,
            seconds
        }

    } catch (error) {

    }
}

// get quiz results using quiz _id (quiz_id) from Result Collection
module.exports.getQuizResult = async function(req, res) {
    try {
        const result = await Result.findOne({ quiz: req.params.quiz_id });
        //console.log("========result======", result);
        if (result) {
            return res.json({ success: true, msg: "Related results successfully found", data: { result: result } });
        } else {
            return res.json({ success: true, msg: "Nothing found any Result", data: null });
        }


    } catch (error) {
        //console.log("============error=============", error);
        return res.json({ success: false, msg: "Internal server Error..", data: null });
    }

}