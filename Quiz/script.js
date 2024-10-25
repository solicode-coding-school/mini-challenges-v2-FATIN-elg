// Liste des questions du quiz
const questions = [
  "In web design, what does CSS stand for?",
  "What does HTML stand for?",
  "Which language is used for web apps?",
  "What year was JavaScript created?",
  "Who invented the World Wide Web?",
];

// Liste des options de réponse pour chaque question
const answers = [
  [
    "Counter Strike: Source",
    "Corrective Style Sheet",
    "Computer Style Sheet",
    "Cascading Style Sheet",
  ],
  [
    "Hypertext Markup Language",
    "Hyperlinks and Text Markup Language",
    "Home Tool Markup Language",
    "Hypertext Machine Language",
  ],
  ["PHP", "Python", "JavaScript", "All"],
  ["1990", "1995", "2000", "2005"],
  ["Steve Jobs", "Bill Gates", "Tim Berners-Lee", "Elon Musk"],
];

// Indexes des réponses correctes pour chaque question
const correctAnswers = [3, 0, 3, 1, 2];

// Variables pour suivre l'état du quiz
let currentQuestion = 0;
let score = 0;
let level = 1;
let questionsToDisplay = [];
const maxQuestionsPerLevel = 5;

// Sélection des éléments HTML
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const questionCounter = document.getElementById("question-counter");
const endButtons = document.getElementById("end-buttons");
const restartBtn = document.querySelector(".restartQuiz");
const quitQuizBtn = document.querySelector(".quitQuiz");

// Fonction pour initialiser le quiz
function startQuiz() {
  // Préparer les questions pour le quiz et initialiser les variables
  questionsToDisplay = questions.slice(0, questions.length);
  currentQuestion = 0;
  score = 0;
  level = 1;
  scoreElement.innerText = score;
  loadQuestion(); // Charger la première question
  restartBtn.style.display = "none";
  quitQuizBtn.style.display = "flex";
}

// Fonction pour charger et afficher la question actuelle et les choix de réponse
function loadQuestion() {
  if (currentQuestion < maxQuestionsPerLevel) {
    questionElement.innerText = questionsToDisplay[currentQuestion];
    choicesElement.innerHTML = "";

    // Afficher chaque choix de réponse avec un événement de clic
    let ABC = ["A", "B", "C", "D"];
    answers[currentQuestion].forEach((choice, index) => {
      const div = document.createElement("div");
      div.classList.add("choice-container");
      div.innerHTML = `<div class="choice-perfix"><p>${ABC[index]}</p></div> 
      <div class="choice-text"><p>${choice}</p></div>`;
      div.onclick = () => checkAnswer(index);
      choicesElement.appendChild(div);
    });

    questionCounter.innerText = `Question ${
      currentQuestion + 1
    }/${maxQuestionsPerLevel}`;
    updateProgressBar(currentQuestion); // Mettre à jour la barre de progression
  } else {
    endQuiz(); // Terminer le quiz si toutes les questions sont répondues
  }
}

// Vérifier si la réponse sélectionnée est correcte

function checkAnswer(index) {
  if (index === correctAnswers[currentQuestion]) {
    score += 5;
  } else {
    if (score > 0) {
      score -= 5;
    }
  }

  scoreElement.innerText = score;
  currentQuestion++;
  if (currentQuestion < maxQuestionsPerLevel) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// Mettre à jour la barre de progression selon le nombre de questions répondues
function updateProgressBar(questionIndex) {
  const progressBar = document.getElementById("final1");
  const percentage = ((questionIndex + 1) / maxQuestionsPerLevel) * 100;
  progressBar.style.width = `${percentage}%`;
}

// Fonction pour terminer le quiz et afficher le score final
function endQuiz() {
  quitQuiz();
}

// Redémarrer le quiz
function restartQuiz() {
  startQuiz();
}

// Fonction pour quitter le quiz et afficher un message final
function quitQuiz() {
  if (score >= 1) {
    questionElement.innerText = `Merci d'avoir joué ! Quiz Terminé ! 
                                 Votre score final est ${score}/25`;
  } else {
    questionElement.innerText = `Ops! Vous avez échoué`;
  }

  choicesElement.innerHTML = "";
  questionCounter.innerText = "";
  restartBtn.style.display = "flex";
  quitQuizBtn.style.display = "none";
}

// Initialiser le quiz au démarrage
startQuiz();
