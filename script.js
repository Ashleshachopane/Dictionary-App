let score = 0;
let timeLeft = 30;
let timer;
let correctAnswer;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const difficultyEl = document.getElementById("difficulty");

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.pitch = 1;
    speech.rate = 1;
    speech.volume = 1;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

function generateQuestion() {
    let max;
    if (difficultyEl.value === "easy") max = 10;
    else if (difficultyEl.value === "medium") max = 50;
    else max = 100;

    const num1 = Math.floor(Math.random() * max) + 1;
    const num2 = Math.floor(Math.random() * max) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    correctAnswer = eval(`${num1} ${operator} ${num2}`);
    questionEl.textContent = `What is ${num1} ${operator} ${num2}?`;
    speak(`What is ${num1} ${operator} ${num2}?`);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = `🏆 Score: ${score}`;
    timerEl.textContent = `⏳ Time: ${timeLeft}`;
    generateQuestion();

    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏳ Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            questionEl.textContent = "Game Over!";
            speak("Game Over! Your score is " + score);
        }
    }, 1000);
}

document.getElementById("submit").addEventListener("click", () => {
    const userAnswer = parseInt(answerEl.value);
    if (userAnswer === correctAnswer) {
        score++;
        feedbackEl.textContent = "✅ Correct!";
        speak("Correct!");
    } else {
        feedbackEl.textContent = "❌ Try again!";
        speak("Try again!");
    }
    scoreEl.textContent = `🏆 Score: ${score}`;
    answerEl.value = "";
    generateQuestion();
});

document.getElementById("start").addEventListener("click", startGame);
