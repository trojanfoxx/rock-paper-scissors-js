let score = loadScore();

const choices = ['rock', 'paper', 'scissors'];
const titles = ['tie', 'win', 'lose'];
const emojis = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

const resultConfig = {
  tie: {
    message: 'Tie!',
    icon: './img/tie.png',
    score: 0,
  },
  win: {
    message: 'You Win!',
    icon: './img/win.png',
    score: 1,
  },
  lose: {
    message: 'You Lose',
    icon: './img/lose.png',
    score: 2,
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

  showGameScreens();

  playerChoiceEl.textContent = emojis[userChoice];
  computerChoiceEl.textContent = emojis[computerChoice];

  showBanner(result);
  updateScore(result);
  updateScoreUI();
  saveScore();
}

function showBanner(result) {
  const resultBox = titles[result];
  const config = resultConfig[resultBox];

  resultCard.classList.remove('hidden', 'win', 'lose', 'tie');
  resultCard.classList.add(resultBox);

  resultTitle.textContent = config.message;
  resultImage.src = config.icon;
}

function updateScore(result) {
  if (result === resultConfig.tie.score) {
    score.tie++;
  } else if (result === resultConfig.win.score) {
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
