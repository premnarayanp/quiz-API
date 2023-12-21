const Quiz = require('../models/quiz');

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