let timerDisplay = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-quiz");



let timeLeft = 5;

function quizTimer() {
    let timer= setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            timerDisplay.textContent = ''
            document.querySelector(".start-quiz").style.display = "block";
        }
    }, 1000);
}

startButton.addEventListener("click", function() {
    quizTimer();
    document.querySelector(".start-quiz").style.display = "none";
});


