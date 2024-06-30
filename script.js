// Quiz questions data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreDisplay = document.getElementById('score');

// Function to render quiz questions
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Add question text
    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    // Add choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (getUserAnswer(i) === choice) {
        choiceElement.checked = true;
      }

      const choiceText = document.createElement("label");
      choiceText.textContent = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Function to get user's answer from session storage
function getUserAnswer(index) {
  const userAnswers = JSON.parse(sessionStorage.getItem('userAnswers')) || [];
  return userAnswers[index];
}

// Function to save user's answer to session storage
function saveUserAnswer(index, answer) {
  let userAnswers = JSON.parse(sessionStorage.getItem('userAnswers')) || [];
  userAnswers[index] = answer;
  sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

// Function to calculate and display score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (getUserAnswer(i) === questions[i].answer) {
      score++;
    }
  }
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem('score', score);
}

// Event listener for submit button
submitButton.addEventListener('click', function() {
  calculateScore();
});

// Initial rendering of quiz questions
renderQuestions();
