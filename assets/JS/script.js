const questions = [
    {
        question: "What is a RESTful API?",
        answers: [
            { text: "cooking recipe for making pasta dishes", correct: false },
            { text: "type of musical instrument used in jazz music", correct: false },
            { text: "species of tropical birds found in the Amazon", correct: false },
            { text: "web services that uses HTTP requests to interact with resources.", correct: true },
        ]
    },
    {
        question: "Mention a back-end language",
        answers: [
            { text: "Wordpress", correct: false },
            { text: "Python", correct: true },
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
        ]
    },
    {
        question: "What is a RESTful API?",
        answers: [
            { text: "cooking recipe for making pasta dishes", correct: false },
            { text: "type of musical instrument used in jazz music", correct: false },
            { text: "species of tropical birds found in the Amazon", correct: false },
            { text: "web services that uses HTTP requests to interact with resources.", correct: true },
        ]
    },
    {
        question: "Define DOM in web development.",
        answers: [
            { text: "Document One Model", correct: false },
            { text: "Document Obsidian Model", correct: false },
            { text: "Document Object Model.", correct: true },
            { text: "Document obelix Model", correct: false },
        ]
    },
    {
        question: "What's an API endpoint??",
        answers: [
            { text: "MongoDB", correct: false },
            { text: "SQL", correct: false },
            { text: "URI", correct: false },
            { text: "URL", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn"); // Added next button

let currentQuestionIndex = 0;
let score = 0;
let quizStartTime;
let quizEndTime;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    quizStartTime = new Date(); // Record quiz start time
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
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    quizEndTime = new Date(); // Record quiz end time
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
    const timeDifference = quizEndTime - quizStartTime;
    const totalSeconds = Math.floor(timeDifference / 1000);
    const totalTimeElement = document.createElement("div");
    totalTimeElement.innerText = `Total Time Used: ${totalSeconds} seconds`;
    questionElement.appendChild(totalTimeElement);
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();