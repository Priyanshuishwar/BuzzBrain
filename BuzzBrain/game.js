// const question = document.getElementById("question");
// const choices = Array.from(document.getElementsByClassName("choice-text"));
// const progressText = document.getElementById("progressText");
// const scoreText = document.getElementById("score");
// const progressBarFull = document.getElementById("progressBarFull");
// const loader = document.getElementById('loader');
// const game = document.getElementById('game');

// let currentQuestion = {};
// let acceptingAnswers = false;
// let score = 0;
// let questionCounter = 0;
// let availableQuestions = [];

// let questions = [
//   {
//     question: "Inside which HTML element do we put the JavaScript?",
//     choice1: "<script>",
//     choice2: "<javascript>",
//     choice3: "<js>",
//     choice4: "<scripting>",
//     answer: 1,
//   },
//   {
//     question: "What is the effect of the <b> tag?",
//     choice1: "It converts text into bold fonts",
//     choice2: "It is used to write black colored font",
//     choice3: "It is used to change the font size",
//     choice4: "None of the above",
//     answer: 1,
//   },
//   {
//     question: "Who is making web standards?",
//     choice1: "The World Wide Web Consortium",
//     choice2: "Google",
//     choice3: "Mozilla",
//     choice4: "Microsoft",
//     answer: 1,
//   }
// ];

// let questions = [];

// fetch("https://opentdb.com/api.php?amount=10&category=18").then(res => {
//   console.log(res);
//   return res.json();
// })
// .then(loadedQuestions => {
//   console.log(loadedQuestions.results);
//   questions = loadedQuestions.results.map(loadedQuestion => {
//     const formatedQuestion = {
//       question: loadedQuestion.question
//     };
//     const answerChoices = [...loadedQuestion.incorrect_answers];
//     formatedQuestion.answer = Math.floor(Math.random() * 3) + 1;
    // answerChoices.splice(formatedQuestion.answer -1, 0,loadedQuestion.incorrect_answer);
//     answerChoices.splice(formatedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
//     answerChoices.forEach((choice, index) => {
//       formatedQuestion["choice" + (index+1)] = choice;
//     })
//     return formatedQuestion;
//   });
//   // questions = loadedQuestions;
//   // game.classList.remove("hidden");
//   // loader.classList.add("hidden");
//   startGame();
// })
// .catch(err => {
//   console.error(err);
// });

// const CORRECT_BONUS = 10;
// const MAX_QUESTIONS = 3;

// choices.forEach((choice, index) => {
//   choice.dataset["number"] = index + 1;
// });

// startGame = () => {
//   questionCounter = 0;
//   score = 0;
//   availableQuestions = [...questions];
//   getNewQuestion();
//   game.classList.remove("hidden");
//   loader.classList.add("hidden");
// };

// getNewQuestion = () => {
//   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
//     localStorage.setItem('mostRecentScore',score);
//     return window.location.assign("/end.html");
//   }

//   questionCounter++;
//   progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

//   progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

//   const questionIndex = Math.floor(Math.random() * availableQuestions.length);
//   currentQuestion = availableQuestions[questionIndex];
//   question.innerText = currentQuestion.question;

//   choices.forEach(choice => {
//     const number = choice.dataset["number"];
//     choice.innerText = currentQuestion["choice" + number];
//   });

//   availableQuestions.splice(questionIndex, 1);
//   acceptingAnswers = true;
// };

// choices.forEach(choice => {
//   choice.addEventListener("click", e => {
//     if (!acceptingAnswers) return;
//     acceptingAnswers = false;

//     const selectedChoice = e.target;
//     const selectedAnswer = selectedChoice.dataset["number"];

//     const classToApply =
//       selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

//     if (classToApply === "correct") {
//       incrementScore(CORRECT_BONUS);
//     }

//     const choiceContainer = selectedChoice.closest(".choice-container");
//     choiceContainer.classList.add(classToApply);

//     setTimeout(() => {
//       choiceContainer.classList.remove(classToApply);
//       getNewQuestion();
//     }, 1000);

//     setTimeout(() => {
//   // Update progress bar before loading next question
//   progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

//   choiceContainer.classList.remove(classToApply);
//   getNewQuestion();
// }, 1000);

//   });
// });

// incrementScore = num => {
//   score += num;
//   scoreText.innerText = score;
// };

// startGame();
// window.addEventListener("DOMContentLoaded", () => {
//   startGame();
// });





const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=18")
  .then(res => res.json())
  .then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch(err => {
    console.error(err);
  });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

choices.forEach((choice, index) => {
  choice.dataset["number"] = index + 1;
});

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  game.classList.remove("hidden");
  loader.classList.add("hidden");
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") incrementScore(CORRECT_BONUS);

    const choiceContainer = selectedChoice.closest(".choice-container");
    choiceContainer.classList.add(classToApply);

    setTimeout(() => {
      choiceContainer.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}
