
const questions = [
    {
        question: "What is the name of Harry Potter's school?",
        options: ["Beauxbatons", "Hogwarts", "Durmstrang", "Ilvermorny"],
        answer: 1
    },
    {
        question: "Which house does Harry Potter belong to?",
        options: ["Slytherin", "Hufflepuff", "Gryffindor", "Ravenclaw"],
        answer: 2
    },
    {
        question: "What is the name of Harry Potter's owl?",
        options: ["Crookshanks", "Hedwig", "Scabbers", "Fawkes"],
        answer: 1
    },
    {
        question: "Who is Harry Potter's best friend?",
        options: ["Draco Malfoy", "Neville Longbottom", "Ron Weasley", "Cedric Diggory"],
        answer: 2
    },
    {
        question: "What is the name of Hermione Granger's cat?",
        options: ["Crookshanks", "Hedwig", "Trevor", "Fang"],
        answer: 0
    },
    {
        question: "Which platform does the Hogwarts Express leave from?",
        options: ["Platform 7", "Platform 9", "Platform 9¾", "Platform 10"],
        answer: 2
    },
    {
        question: "Who is the headmaster of Hogwarts for most of Harry's early years?",
        options: ["Severus Snape", "Albus Dumbledore", "Rubeus Hagrid", "Minerva McGonagall"],
        answer: 1
    },
    {
        question: "What position does Harry play on his Quidditch team?",
        options: ["Keeper", "Beater", "Chaser", "Seeker"],
        answer: 3
    },
    {
        question: "What is the name of the sport played on flying broomsticks?",
        options: ["Gobstones", "Quidditch", "Wizard Chess", "Duelling"],
        answer: 1
    },
    {
        question: "Which spell is used to disarm an opponent?",
        options: ["Lumos", "Expelliarmus", "Alohomora", "Wingardium Leviosa"],
        answer: 1
    },
    {
        question: "What is Voldemort's real name?",
        options: ["Tom Marvolo Riddle", "Tom Oliver Riddle", "Thomas Malfoy", "Lucius Riddle"],
        answer: 0
    },
    {
        question: "What magical object shows a person's deepest desire?",
        options: ["The Pensieve", "The Mirror of Erised", "The Marauder's Map", "The Sorting Hat"],
        answer: 1
    },
    {
        question: "Which creature is Buckbeak?",
        options: ["Basilisk", "Phoenix", "Hippogriff", "Thestral"],
        answer: 2
    },
    {
        question: "What is the name of the bank used by wizards?",
        options: ["Gringotts", "Hogwarts Bank", "Diagon Bank", "Ollivanders"],
        answer: 0
    },
    {
        question: "Who gives Harry his first broomstick, a Nimbus 2000?",
        options: ["Hagrid", "Ron Weasley", "Professor McGonagall", "Sirius Black"],
        answer: 2
    },
    {
        question: "What is the name of Ron Weasley's pet rat?",
        options: ["Scabbers", "Crookshanks", "Arnold", "Trevor"],
        answer: 0
    },
    {
        question: "Which potion is known as the Liquid Luck?",
        options: ["Amortentia", "Felix Felicis", "Polyjuice Potion", "Veritaserum"],
        answer: 1
    },
    {
        question: "What are the three objects known as the Deathly Hallows?",
        options: [
            "The Elder Wand, Resurrection Stone, and Invisibility Cloak",
            "The Sword of Gryffindor, a Time-Turner, and the Elder Wand",
            "The Goblet of Fire, the Elder Wand, and the Marauder's Map",
            "The Resurrection Stone, the Sorting Hat, and the Invisibility Cloak"
        ],
        answer: 0
    },
    {
        question: "Which house is associated with the symbol of a snake?",
        options: ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"],
        answer: 3
    },
    {
        question: "What is the name of the prison guarded by Dementors?",
        options: ["Azkaban", "Nurmengard", "Gringotts", "The Forbidden Forest"],
        answer: 0
    }
];

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const restartBtn = document.getElementById("restartBtn");

const questionCounter = document.getElementById("questionCounter");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const progressFill = document.getElementById("progressFill");
const selectionHint = document.getElementById("selectionHint");

const scoreValue = document.getElementById("scoreValue");
const percentageValue = document.getElementById("percentageValue");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const resultProgressFill = document.getElementById("resultProgressFill");
const reviewContainer = document.getElementById("reviewContainer");

let currentQuestion = 0;
let userAnswers = [];

function startQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);

    welcomeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    renderQuestion();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
    const question = questions[currentQuestion];
    const selectedAnswer = userAnswers[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionNumber.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;

    questionText.textContent = question.question;

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsContainer.replaceChildren();

    question.options.forEach((optionText, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "option";

        if (selectedAnswer === index) {
            button.classList.add("selected");
        }

        const letter = document.createElement("span");
        letter.className = "option-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.textContent = optionText;

        button.append(letter, text);

        button.setAttribute(
            "aria-pressed",
            selectedAnswer === index ? "true" : "false"
        );

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        optionsContainer.appendChild(button);
    });

    selectionHint.textContent = selectedAnswer === null
        ? "Choose the answer you believe is correct."
        : "Answer selected. You can change it before continuing.";

    backBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = selectedAnswer === null;

    nextBtn.innerHTML =
        currentQuestion === questions.length - 1
            ? "Finish Quiz ✦"
            : "Next Question →";
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    renderQuestion();
}

function goNext() {
    if (userAnswers[currentQuestion] === null) {
        selectionHint.textContent = "Please select an answer first.";
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
        return;
    }

    showResults();
}

function goBack() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function showResults() {
    const score = questions.reduce((total, question, index) => {
        return total + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / questions.length) * 100);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    scoreValue.textContent = score;
    percentageValue.textContent = `${percentage}% correct`;
    resultProgressFill.style.width = `${percentage}%`;

    if (percentage === 100) {
        resultTitle.textContent = "Outstanding, Wizard!";
        resultDescription.textContent =
            "Perfect score! Your knowledge of the wizarding world is extraordinary.";
    } else if (percentage >= 75) {
        resultTitle.textContent = "Excellent Work!";
        resultDescription.textContent =
            "You are a remarkable wizarding world enthusiast. Well done!";
    } else if (percentage >= 50) {
        resultTitle.textContent = "Well Done!";
        resultDescription.textContent =
            "You know quite a bit about Hogwarts. Keep exploring the magical world!";
    } else {
        resultTitle.textContent = "Keep Practising!";
        resultDescription.textContent =
            "Every great wizard learns along the way. Try again and see how you improve!";
    }

    renderReview();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderReview() {
    reviewContainer.replaceChildren();

    questions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.answer;
        const selectedText = userAnswers[index] === null
            ? "Not answered"
            : question.options[userAnswers[index]];

        const item = document.createElement("article");
        item.className = `review-item ${isCorrect ? "correct" : "incorrect"}`;

        const title = document.createElement("h3");
        title.className = "review-question";
        title.textContent = `${index + 1}. ${question.question}`;

        const status = document.createElement("p");
        status.className = "review-status";

        // Intentionally do not display the correct answer in the review.
        status.textContent = isCorrect
            ? `✓ Correct — Your answer: ${selectedText}`
            : `✗ Incorrect — Your answer: ${selectedText}`;

        item.append(title, status);
        reviewContainer.appendChild(item);
    });
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goNext);
backBtn.addEventListener("click", goBack);
restartBtn.addEventListener("click", startQuiz);
