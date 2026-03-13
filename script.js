let score = loadScore();

const choices = ['rock', 'paper', 'scissors'];

const emojis = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

const RESULT = {
  TIE: 0,
  WIN: 1,
  LOSE: 2,
};

const choicesScreen = document.querySelector('.choices-screen');
const scoreScreen = document.querySelector('.score-screen');

const choiceButtons = document.querySelectorAll('.button-choice');

const playerChoiceEl = document.querySelector('.player-choice');
const computerChoiceEl = document.querySelector('.computer-choice');

const resultTitle = document.querySelector('.result-title');

const tieCount = document.querySelector('.tie-count');
const winCount = document.querySelector('.win-count');
const loseCount = document.querySelector('.lose-count');

const resetButton = document.querySelector('.reset-button');

initUI();

choiceButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const userChoice = event.currentTarget.dataset.choice;
    playGame(userChoice);
  });
});

resetButton.addEventListener('click', resetScore);

function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  const result = getGameResult(userChoice, computerChoice);

  showGameScreens();

  playerChoiceEl.textContent = emojis[userChoice];
  computerChoiceEl.textContent = emojis[computerChoice];

  updateScore(result);
  updateScoreUI();
  saveScore();
}

function updateScore(result) {
  if (result === RESULT.TIE) {
    score.tie++;
  } else if (result === RESULT.WIN) {
    score.win++;
  } else {
    score.lose++;
  }
}

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getGameResult(userChoice, computerChoice) {
  const userIndex = choices.indexOf(userChoice);
  const computerIndex = choices.indexOf(computerChoice);

  return (userIndex - computerIndex + choices.length) % choices.length;
}

function initUI() {
  const scoreIsZero = Object.values(score).every((value) => value === 0);

  if (scoreIsZero) {
    choicesScreen.classList.add('hidden');
    scoreScreen.classList.add('hidden');
    resetButton.classList.add('hidden');
  } else {
    choicesScreen.classList.add('hidden');
    updateScoreUI();
  }
}

function updateScoreUI() {
  tieCount.textContent = score.tie;
  winCount.textContent = score.win;
  loseCount.textContent = score.lose;
}

function showGameScreens() {
  choicesScreen.classList.remove('hidden');
  scoreScreen.classList.remove('hidden');
  resetButton.classList.remove('hidden');
}

function resetScore() {
  score = { tie: 0, win: 0, lose: 0 };
  saveScore();
  initUI();
}

function saveScore() {
  localStorage.setItem('score', JSON.stringify(score));
}

function loadScore() {
  return (
    JSON.parse(localStorage.getItem('score')) || {
      tie: 0,
      win: 0,
      lose: 0,
    }
  );
}
