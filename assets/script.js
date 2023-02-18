var timerDisplay = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-quiz");
var quizQuestion = document.querySelector(".question");
var answerBank = document.querySelector(".answer-bank");
var quizBox = document.querySelector(".quiz-box");
var resultDisplay;
var score = 0;

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

var timeLeft = 5;
var currentIndex;

function startQuiz() {
    currentIndex = 0
    showQuestion()
}

//this function generates a new quiz question/answers and displays them
function showQuestion() { 
    quizQuestion.textContent = quizBank[currentIndex].question;
    for (i = 0; i < quizBank[currentIndex].answer.length; i++) {
        console.log(i);
        var answer = document.createElement("button");
        answer.classList.add("quiz-button");
        answer.textContent = quizBank[currentIndex].answer[i];
        if (quizBank[currentIndex].answer[i] === quizBank[currentIndex].correct) {
            answer.setAttribute("correct", "true")
        }
        answerBank.appendChild(answer);
    }
}

document.getElementsByClassName("quiz-box")[0].addEventListener("click", boxCheckAnswer)

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
    resultDisplay.remove();
    timerDisplay.textContent = ''
    document.querySelector(".start-quiz").style.display = "block";
    timeLeft = 5;
    quizQuestion.textContent = ("Finished! \n Your final score was " + score + "." +"\n Please enter your initials below:");

}

// function quizTimer() {
//     var timer= setInterval(function() {
//         timeLeft--;
//         timerDisplay.textContent = timeLeft;
//         if (timeLeft === 0) {
//             clearInterval(timer);
//             endQuiz()
//         }
//     }, 1000);
// }

startButton.addEventListener("click", function () {
    // quizTimer();
    startQuiz();
    document.querySelector(".start-quiz").style.display = "none";
});


function saveToStorage(newValueToSave){
    currentStorage = JSON.parse(localStorage.getItem("saved-scores"))
    if(!currentStorage || !currentStorage.length){
        localStorage.setItem("saved-scores", JSON.stringify([newValueToSave]))
        return
    }
    currentStorage.push(newValueToSave)
    localStorage.setItem("saved-scores", JSON.stringify(currentStorage))
}

saveToStorage("Justin")

function loadStorage() {
    currentStorage = JSON.parse(localStorage.getItem("saved-scores"))
    if(!currentStorage || !currentStorage.length){
        return
    }
    // for loop and render it
}