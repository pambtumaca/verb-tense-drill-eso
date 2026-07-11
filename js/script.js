const questions = [
  {
    text: 'She <em>(go)</em> ____ to school every day.',
    answer: 'goes'
  },
  {
    text: 'They <em>(play)</em> ____ football yesterday.',
    answer: 'played'
  },
  {
    text: 'My brother <em>(study)</em> ____ English on Mondays.',
    answer: 'studies'
  }
];

const quizContainer = document.getElementById('quiz');
const showScoreBtn = document.getElementById('show-score');
const finalScore = document.getElementById('final-score');

function renderQuiz() {
  questions.forEach((question, index) => {
    const item = document.createElement('div');
    item.className = 'item';

    item.innerHTML = `
      <label for="q${index + 1}">${index + 1}. ${question.text}</label>
      <div class="row">
        <input id="q${index + 1}" type="text" placeholder="Write the verb form">
        <button type="button" data-index="${index}">Check</button>
      </div>
      <div id="f${index + 1}" class="feedback" aria-live="polite"></div>
    `;

    quizContainer.appendChild(item);
  });
}

function checkAnswer(index) {
  const question = questions[index];
  const input = document.getElementById(`q${index + 1}`);
  const feedback = document.getElementById(`f${index + 1}`);
  const value = input.value.trim().toLowerCase();
  const expected = question.answer.toLowerCase();

  if (!value) {
    feedback.textContent = 'Write an answer first.';
    feedback.className = 'feedback bad';
    input.classList.remove('answer-correct', 'answer-incorrect');
    return;
  }

  if (value === expected) {
    feedback.textContent = 'Correct ✓';
    feedback.className = 'feedback ok';
    input.classList.add('answer-correct');
    input.classList.remove('answer-incorrect');
  } else {
    feedback.textContent = `Incorrect ✗. Correct answer: ${question.answer}.`;
    feedback.className = 'feedback bad';
    input.classList.add('answer-incorrect');
    input.classList.remove('answer-correct');
  }
}

function countCorrectAnswers() {
  let correct = 0;

  questions.forEach((question, index) => {
    const input = document.getElementById(`q${index + 1}`);
    if (input.value.trim().toLowerCase() === question.answer.toLowerCase()) {
      correct += 1;
    }
  });

  return correct;
}

renderQuiz();

quizContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const index = Number(event.target.dataset.index);
    checkAnswer(index);
  }
});

showScoreBtn.addEventListener('click', () => {
  const correct = countCorrectAnswers();
  finalScore.textContent = `You got ${correct} out of ${questions.length} questions right.`;
  finalScore.className = correct === questions.length ? 'results feedback ok' : 'results feedback bad';
});
