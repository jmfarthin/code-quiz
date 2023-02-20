// This code creates the functionality for the Javascript quiz

// element selector variables
var timerDisplay = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-quiz");
var quizQuestion = document.querySelector(".question");
var answerBank = document.querySelector(".answer-bank");
var quizBox = document.querySelector(".quiz-box");
var initialsForm = document.querySelector(".initials-section");
var submitScore = document.querySelector(".submit-score");
var initials = document.getElementById("initials");
var viewHighScores = document.querySelector(".high-score");

// variables for keeping track of values
var timer;
var timeLeft;
var currentIndex;
var resultDisplay;
var score = 0;
var newHighScore = {};

//holds all of the questions and answers for quiz
var quizBank = [
    {
        question: "Which is NOT a valid data type in Javascript?",
        answer: ["number", "boolean", "string", "int"],
        correct: "int"

    },
    {
        question: "Javascript was originally used for pop-ups.",
        answer: ["true", "false"],
        correct: "true"

    },
    {
        question: "If you wanted to call a certain set of instructions whenever you wanted, what would you use?",
        answer: ["for loop", "if statement", "function", "API"],
        correct: "function"
    },
    {
        question: "If I declared const num = 10 and then num = 8, what is the value of num?",
        answer: ["8", "NaN", "10", "none of these"],
        correct: "10"
    },
    {
        question: "_________________ are a good way to apply a set of instructions to every item in an array.",
        answer: ["for loops", "function", "objects", "none of these"],
        correct: "for loops"
    }
]


// initializes the quiz, resets the timer, and hides the high score button
function startQuiz() {
    timeLeft = 25;
    currentIndex = 0
    showQuestion()
    viewHighScores.hidden = true;
}

//this function generates a new quiz question/answers and displays them
function showQuestion() { 
    quizQuestion.textContent = quizBank[currentIndex].question;
    for (i = 0; i < quizBank[currentIndex].answer.length; i++) {
        console.log(i);
        var answer = document.createElement("button");
        answer.classList.add("quiz-button");
        answer.textContent = quizBank[currentIndex].answer[i];
        answer.addEventListener("click", boxCheckAnswer);
        if (quizBank[currentIndex].answer[i] === quizBank[currentIndex].correct) {
            answer.setAttribute("correct", "true")
        }
        answerBank.appendChild(answer);
    }
}

// checks if your selection is correct and goes to the next question or ends the quiz
function boxCheckAnswer(event) {
    event.preventDefault()
    console.log("BOX PRESSED!")
    if (event.target.matches("button")) {
        if (resultDisplay) {
            resultDisplay.remove();
        }
        if (event.target.hasAttribute("correct")) {
            console.log("yay")
            score += 10;
            console.log(score);
            resultDisplay = document.createElement("h3");
            resultDisplay.classList.add("display-result");
            resultDisplay.innerHTML = "Your previous answer was correct!";
            quizBox.appendChild(resultDisplay);
        } else {
            if (score >= 10) {
                score -= 10;
            };
            timeLeft -= 3;
            console.log(score);
            resultDisplay = document.createElement("h3");
            resultDisplay.classList.add("display-result");
            resultDisplay.innerHTML = "Your previous answer was incorrect!";
            quizBox.appendChild(resultDisplay);
            console.log("nay")
        }
    } 
    quizBank.shift();
    // removes the quiz buttons for the next question or ends the quiz if there are no more questions
    if (!quizBank.length) {
        document.querySelectorAll(".quiz-button").forEach(e => e.remove());
        endQuiz();
    } else {
        document.querySelectorAll(".quiz-button").forEach(e => e.remove());
        showQuestion();
    };
};

// removes the last question and answers, shows the user's score and allows them to enter their initials
function endQuiz() {
    if (resultDisplay) {
        resultDisplay.remove();
    }
    document.querySelectorAll(".quiz-button").forEach(e => e.remove());
    timerDisplay.textContent = ''
    initialsForm.hidden = false;
    quizQuestion.textContent = ("Finished! Your final score was "+ score + "."+" Please enter your initials below:");
}

// creates a timer for the quiz, when it reaches 0 or if the user answers all the questions, it ends the quiz
function quizTimer() {
    timer= setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft >= 0 && !quizBank.length) {
            clearInterval(timer);
            endQuiz()
        } 
        if (timeLeft === 0) {
            clearInterval(timer);
            endQuiz()
        }
    }, 1000);
}

// allows user to start the quiz by clicking start button
startButton.addEventListener("click", function () {
    quizTimer();
    startQuiz();
    document.querySelector(".start-quiz").style.display = "none";
});

// submits user's initials and score to be stored in the high score section
submitScore.addEventListener("click", function(event) {
    event.preventDefault();
    setHighScore();
    loadHighScores();
})

// allows user to click view high score button and view all score entries
viewHighScores.addEventListener("click", function(event){
    event.preventDefault();
    loadHighScores();
})


// stores initials and score as an object within an array and then to local storage
function setHighScore() {
    newHighScore = {
        initials: initials.value,
        score: score
    }
    saveToStorage(newHighScore);
}

// saves high scores to local storage
function saveToStorage(newValueToSave){
    currentStorage = JSON.parse(localStorage.getItem("saved-scores"))
    if(!currentStorage || !currentStorage.length){
        localStorage.setItem("saved-scores", JSON.stringify([newValueToSave]))
        console.log(currentStorage);
        return
    }
    currentStorage.push(newValueToSave)
    localStorage.setItem("saved-scores", JSON.stringify(currentStorage))
}

// pulls scores from local storage and renders them for the user
function loadHighScores() {
    currentStorage = JSON.parse(localStorage.getItem("saved-scores"))
    viewHighScores.hidden = true;
    initialsForm.hidden = true;
    startButton.style.display = "none";
    goBack.hidden = false;
    if(!currentStorage || !currentStorage.length){
        quizQuestion.textContent = "No high scores!"
    } else {
        quizQuestion.textContent = "View your score!"
        var highScoreList = document.createElement("ol");
        answerBank.appendChild(highScoreList);
        currentStorage.forEach(function(savedScore) {
            console.log(savedScore);
            var scoreListItem = document.createElement("li");
            scoreListItem.innerHTML = savedScore.initials + " " + savedScore.score;
            scoreListItem.classList.add("score-item");
            highScoreList.appendChild(scoreListItem);
        });
        resetButton.hidden = false;
    }
}

// this section creates a reset and go back button and functionality
var resetButton = document.getElementById("reset-score");
var goBack = document.getElementById("go-back");

resetButton.addEventListener("click", function() {
    localStorage.clear();
    document.querySelectorAll("li").forEach(e => e.remove());
    resetButton.hidden = true;
    loadHighScores()
});

goBack.addEventListener("click", function() {
    location.reload();
});