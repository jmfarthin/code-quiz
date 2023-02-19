var timerDisplay = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-quiz");
var quizQuestion = document.querySelector(".question");
var answerBank = document.querySelector(".answer-bank");
var quizBox = document.querySelector(".quiz-box");
var initialsForm = document.querySelector(".initials-section");
var submitScore = document.querySelector(".submit-score");
var initials = document.getElementById("initials");
var viewHighScores = document.querySelector(".high-score");

var timer;
var timeLeft;
var currentIndex;
var resultDisplay;
var score = 0;
var newHighScore = {};

var quizBank = [
    {
        question: "Which number is largest?",
        answer: ["1", "2", "3", "4"],
        correct: "4"

    },
    {
        question: "Which number is smallest?",
        answer: ["1", "2", "3", "-4"],
        correct: "-4"

    },
    {
        question: "Which choice is a number?",
        answer: ["A", "Yes", "3", "No"],
        correct: "3"
    }
]



function startQuiz() {
    timeLeft = 10;
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

// document.getElementsByClassName("quiz-box")[0].addEventListener("click", boxCheckAnswer)

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
        //check if you have questions left?
        // if you don't, call endQuiz()
        //if you do, move to the next question
        // and call showQuestion()
        //remove question from quizBank
    } 
    quizBank.shift();
    
    if (!quizBank.length) {
        document.querySelectorAll(".quiz-button").forEach(e => e.remove());
        endQuiz();
    } else {
        document.querySelectorAll(".quiz-button").forEach(e => e.remove());
        showQuestion();
    };
};
    
function endQuiz() {
    if (resultDisplay) {
        resultDisplay.remove();
    }
    document.querySelectorAll(".quiz-button").forEach(e => e.remove());
    timerDisplay.textContent = ''
    // startButton.style.display = "block";
    // timeLeft = 5;
    initialsForm.hidden = false;
    quizQuestion.textContent = ("Finished! Your final score was "+ score + "."+" Please enter your initials below:");
}

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

startButton.addEventListener("click", function () {
    quizTimer();
    startQuiz();
    document.querySelector(".start-quiz").style.display = "none";
});

submitScore.addEventListener("click", function(event) {
    event.preventDefault();
    setHighScore();
    loadHighScores();
})

viewHighScores.addEventListener("click", function(event){
    event.preventDefault();
    loadHighScores();
})

function setHighScore() {
    newHighScore = {
        initials: initials.value,
        score: score
    }
    saveToStorage(newHighScore);
}

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

// saveToStorage("Justin")

function loadHighScores() {
    currentStorage = JSON.parse(localStorage.getItem("saved-scores"))
    viewHighScores.hidden = true;
    initialsForm.hidden = true;
    startButton.style.display = "none";
    goBack.hidden = false;
    if(!currentStorage || !currentStorage.length){
        quizQuestion.textContent = "No high scores!"
    } else {
        // viewHighScores.hidden = true;
        // initialsForm.hidden = true;
        // startButton.style.display = "none";
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
        // goBack.hidden = false;
    }
    // for loop and render it
}

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