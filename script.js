let score = loadScore();

const choices = ['rock', 'paper', 'scissors'];
const resultKeys = ['tie', 'win', 'lose'];
const emojis = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

const resultConfig = {
  tie: {
    message: 'Tie!',
    icon: './img/tie.png',
    alt: 'Tie result card',
  },
  win: {
    message: 'You Win!',
    icon: './img/win.png',
    alt: 'Win result card',
  },
  lose: {
    message: 'You Lose',
    icon: './img/lose.png',
    alt: 'Lose result card',
  },
};

const choicesScreen = document.querySelector('.choices-screen');
const scoreScreen = document.querySelector('.score-screen');

const choiceButtons = document.querySelectorAll('.button-choice');

const playerChoiceEl = document.querySelector('.player-choice');
const computerChoiceEl = document.querySelector('.computer-choice');

const resultCard = document.querySelector('.result-card');
const resultTitle = document.querySelector('.result-title');
const resultImage = document.querySelector('.result-image');

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

  playerChoiceEl.textContent = emojis[userChoice];
  computerChoiceEl.textContent = emojis[computerChoice];

  updateScore(result);
  saveScore();
  showGameScreens();
  showBanner(result);
  updateScoreUI();
}

function showBanner(result) {
  const resultKey = resultKeys[result];
  const config = resultConfig[resultKey];

  resultCard.classList.remove('win', 'lose', 'tie');
  resultCard.classList.remove('hidden');
  resultCard.classList.add(resultKey);

  resultTitle.textContent = config.message;
  resultImage.src = config.icon;
  resultImage.alt = config.alt;
}

function updateScore(result) {
  switch (result) {
    case 0:
      score.tie++;
      break;
    case 1:
      score.win++;
      break;
    case 2:
      score.lose++;
      break;
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
    resultCard.classList.add('hidden');
  } else {
    choicesScreen.classList.add('hidden');
    resultCard.classList.add('hidden');
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
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
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
