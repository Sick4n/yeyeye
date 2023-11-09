const questions = [
    {
        question: "What does MVC stand for in the context of full-stack development?",
        answers: [
            { text: "Model View Control", correct: false },
            { text: "Modular View Controller", correct: false },
            { text: "Model View Component", correct: false },
            { text: "Model-View-Controller", correct: true },
        ]
    },
    {
        question: "Which of the following is a front-end framework for building user interfaces",
        answers: [
            { text: "Django", correct: false },
            { text: "Angular", correct: true },
            { text: "Flask", correct: false },
            { text: "Express", correct: false },
        ]
    },
    {
        question: "In JavaScript, what does the typeof operator return for an undefined variable?",
        answers: [
            { text: "Null", correct: false },
            { text: "String", correct: false },
            { text: "Object", correct: false },
            { text: "Undefined", correct: true },
        ]
    },
    {
        question: "Which database type is commonly associated with full-stack development?",
        answers: [
            { text: "XML", correct: false },
            { text: "NoSQL", correct: false },
            { text: "SQL", correct: true },
            { text: "CSV", correct: false },
        ]
    },
    {
        question: "What is the role of a reverse proxy in a full-stack application architecture?",
        answers: [
            { text: "Manage database connections", correct: false },
            { text: "Authenticate users", correct: false },
            { text: "Handle client-side routing", correct: false },
            { text: "Improve application performance", correct: true },
        ]
    }, {
        question: "What is the purpose of a package manager in full-stack development?",
        answers: [
            { text: "Manage software updates", correct: false },
            { text: "Manage server configurations", correct: false },
            { text: "Manage project dependencies", correct: true },
            { text: "Manage database transactions", correct: false },
        ]
    },
    {
        question: "Which HTTP status code indicates a successful request in a RESTful API?",
        answers: [
            { text: "500 Internal Server Error", correct: false },
            { text: "302 Found", correct: false },
            { text: "404 Not Found", correct: false },
            { text: "200 OK", correct: true },
        ]
    }, {
        question: "Which CSS framework is known for its grid system and responsive design capabilities?",
        answers: [
            { text: "Tailwind CSS", correct: false },
            { text: "Bulma", correct: false },
            { text: "Bootstrap ", correct: true },
            { text: "Foundation", correct: false },
        ]
    },
    {
        question: "What is the purpose of the npm command in Node.js development?",
        answers: [
            { text: "Execute SQL queries", correct: false },
            { text: "Create server routes", correct: false },
            { text: "Define HTML templates", correct: false },
            { text: "Manage project dependencies", correct: true },
        ]
    },
    {
        question: "What is a stateless authentication mechanism commonly used in RESTful APIs?",
        answers: [
            { text: "Basic Authentication", correct: false },
            { text: "OAuth", correct: false },
            { text: "API key", correct: false },
            { text: "JWT (JSON Web Token)", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn"); // Added next button

let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let seconds = 0;

function runTimer() {
    timer = setInterval(function () {
        seconds = seconds + 1;
        document.getElementById('timer').innerHTML = seconds + ' seconds';
    }, 1000);
}

function startQuiz() {
    nextButton.style.display = "none";
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    runTimer();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    setTimeout(function () {
        handleNextButton();
    }, 2000);
}

function showScore() {
    clearInterval(timer);
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    displayTotalTime();
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function displayTotalTime() {
    const totalTimeElement = document.createElement("div");
    totalTimeElement.innerText = `Total Time Used: ${seconds} seconds`;
    questionElement.appendChild(totalTimeElement);
    seconds = 0;
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();