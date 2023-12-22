Quiz-API Functionality and Designing
Live URL:- https://quiz-api-66w2.onrender.com

Step Points: -
1.	Required Module and Dependency.
2.	Project Structure.
3.	Functionality/working & Screenshot.
3.1.	 Sign-up
3.2.	 Login.
3.3.	 Create Quiz
3.4.	 Get Active Quiz
3.5.	 Get All Quiz
3.6.	 Get Quiz Result
3.7.	 Create Results Using node-cron after end the quiz


1.	Required Module and Dependency: -
 "dependencies": {
        "connect-mongo": "^3.2.0",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^16.1.4",
        "express": "^4.18.2",
        "express-session": "^1.17.3",
        "jsonwebtoken": "^9.0.0",
        "mongoose": "^7.1.2",
        "node-cron": "^3.0.3",
        "passport": "^0.6.0",
        "passport-jwt": "^4.0.1",
        "passport-local": "^1.0.0"
    },
    "devDependencies": {
        "nodemon": "^2.0.22"
    }

2.	Project Structure: -
a.	![image](https://github.com/premnarayanp/quiz-API/assets/124772915/babe5f9e-9bb4-4eae-ab7c-d4ef00fba9cb)


b.	![image](https://github.com/premnarayanp/quiz-API/assets/124772915/2f473c7d-8a7c-46a5-9156-0c92a7e7ce60)

 



3.	Functionality/working & Screenshot
1)	Sign-up: - 
a.	Routes: -  https://quiz-api-66w2.onrender.com/users/signup    https://quiz-api-66w2.onrender.com/users/signup
b.	Postman Data: -
name:” p3”, 
email:”p3@gmail.com”, 
password:”1”, 
confirmPassword:”1”
![image](https://github.com/premnarayanp/quiz-API/assets/124772915/dd1553c8-0299-47da-8a97-81bb3fa63c4a)

 
c.	Validations1: -Required all fields
![image](https://github.com/premnarayanp/quiz-API/assets/124772915/a0c6e791-c586-4219-99bc-cd8794ff06b7)

 
d.	Validations2: - Confirm password should be matched
![image](https://github.com/premnarayanp/quiz-API/assets/124772915/629e3f24-198d-47bf-b1b7-c2d161c1a0ee)

 
e.	Validation3: -User mail id should be unique
 ![image](https://github.com/premnarayanp/quiz-API/assets/124772915/4feb0f35-bf17-4917-8928-e3628542f66e)



2)	Login: -
a.	Routes: - https://quiz-api-66w2.onrender.com/users/login     OR Local like  http://localhost:8399/users/login
b.	Postman Data: -
email:”p3@gmail.com”
password:”3”
 ![image](https://github.com/premnarayanp/quiz-API/assets/124772915/c8b760aa-798a-482f-a157-bc48784aa3a3)


c.	Bearer JWT token: -
 ![image](https://github.com/premnarayanp/quiz-API/assets/124772915/4f13587a-490f-4310-96a1-9bb5d89597a8)


d.	Validation: - All login validation step just same as signup.

3)	Create Quiz: -
a.	Route: - https://quiz-api-66w2.onrender.com/quizzes/endpoints   OR Local like  http://localhost:8399/quizzes/endpoints
b.	Postman Data: -
question:” How to autherized user for Rest API?”,
options []:” Using Passport JWT Strategy”,
options []:” Using Cookies”,
options []:” using Passport Local Strategy”,
options []:” Using Match the password every Request”,
rightAnswer:1,
startDate:” 2023-12-22T14:16:00.000Z”,
endDate:” 2023-12-22T14:20:00.000Z”,

![image](https://github.com/premnarayanp/quiz-API/assets/124772915/f16b3fd0-33ab-40da-a658-8105bcfd1092)

 
c.	Output Response: -
 
 ![image](https://github.com/premnarayanp/quiz-API/assets/124772915/72e845c4-859e-47e4-96ce-4df2ed89522e)
 

d.	Validation: - All Field Required and startDate & endDate must be in ISO valid format.
If startDate and endDate does not in ISO format then then response would be: -
                   {
                    "success": false,
                    "msg": "please fill fully valid date in ISO format..",
                    "data": null
                  }



4)	Get Active Quiz: -get req
a.	Route: - https://quiz-api-66w2.onrender.com/quizzes/active   OR Local like   http://localhost:8399/quizzes/active
b.	Get Active quiz in before quiz end: -
 ![image](https://github.com/premnarayanp/quiz-API/assets/124772915/b3d788f0-4d18-46b7-90a1-55eefd407787)


c.	Get Active quiz in after quiz end: -

 ![image](https://github.com/premnarayanp/quiz-API/assets/124772915/fb7b5253-dcaa-4dff-8d1b-9a0ffbc92335)

 


5)	Get All Quiz: -
a.	Route: - https://quiz-api-66w2.onrender.com/quizzes/all   OR Local like http://localhost:8399/quizzes/all
b.	Output Response: - Array of all quiz.
 ![image](https://github.com/premnarayanp/quiz-API/assets/124772915/a11b440f-0b73-41de-ae2e-99045f85550f)


6)	Get Quiz Result: -
a.	Route: -https://quiz-api-66w2.onrender.com/quizzes/65856f71bf63dce4ad3ff796/result  OR Local like  http://localhost:8399/quizzes/658551db8ee651d52d60a121/result
b.	Get results in before quiz end: -
              {
                  "success": true,
                  "msg": "Nothing found any Result",
                  "data": null
                     }


c.	Get results after 5 minutes of quiz end: -

 
![image](https://github.com/premnarayanp/quiz-API/assets/124772915/1ff08526-b309-4d35-9cc0-81ce5ec46af7)



7)	Create Results Using node-cron: -
a.	Schedule a job every 5 minutes, in quizzes routes-
          //Schedule cron job every 5 minutes to create/update results
            let job = new cron.schedule('*/5 * * * *', () => {
              quizzesController.createResults();
            });
           job.start()

b.	Controller code: -
8)	//create/Update results using node-cron
9)	module.exports.createResults = async function(req, res) {
10)	    try {
11)	        const quizzes = await Quiz.find({ isActiveQuiz: true });
12)	        if (quizzes) {
13)	            quizzes.forEach(async(quiz) => {
14)	                //Remain time to end this quiz according endDate
15)	                const remainingTime = getRemainingTime(quiz.endDate);
16)	                console.log("remainingTime", remainingTime);
17)	                if (remainingTime.day == 0 && remainingTime.hours == 0 && remainingTime.minutes * 60 + remainingTime.seconds <= 0) {
18)	
19)	                    const result = await Result.create({
20)	                        pass: true,
21)	                        totalQuestions: 1,
22)	                        rightAnswer: quiz.rightAnswer,
23)	                        quiz: quiz._id,
24)	                        user: quiz.user,
25)	                    });
26)	                    //console.log("result", result);
27)	                    quiz.isActiveQuiz = false;
28)	                    quiz.result = result._id;
29)	                    quiz.save();
30)	                }
31)	            });
32)	        }
33)	
34)	    } catch (error) {
35)	
36)	    }
37)	
38)	}
39)	
40)	//get minutes,second,hour from ISO string and current time  different
41)	function getRemainingTime(isoDateString) {
42)	    try {
43)	        const currentDate = new Date();
44)	        const date = new Date(isoDateString);
45)	
46)	        const day = date.getUTCDate() - currentDate.getDate();
47)	        //console.log("day=", day);
48)	        const hours = date.getUTCHours() - currentDate.getHours();
49)	        const minutes = date.getUTCMinutes() - currentDate.getMinutes();
50)	        const seconds = date.getUTCSeconds() - currentDate.getSeconds();
51)	        return {
52)	            day,
53)	            hours,
54)	            minutes,
55)	            seconds
56)	        }
57)	
58)	    } catch (error) {
59)	
60)	    }
61)	}

