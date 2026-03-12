let score = JSON.parse(localStorage.getItem('score')) || {
  tie: 0,
  win: 0,
  lose: 0,
};

const checkValuesMath = Object.values(score).every((value) => value === 0);

const choices = ['rock', 'paper', 'scissors'];
const emojis = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
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

if (checkValuesMath) {
  choicesScreen.classList.add('hidden');
  scoreScreen.classList.add('hidden');
  resetButton.classList.add('hidden');
} else {
  choicesScreen.classList.add('hidden');
}

choiceButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const userChoice = event.currentTarget.dataset.choice;
    playGame(userChoice);
  });
});

function playGame(userChoice) {
  const computerIndex = Math.floor(Math.random() * 3);
  const computerChoice = choices[computerIndex];
  const userIndex = choices.indexOf(userChoice);

  const result = (userIndex - computerIndex + 3) % 3;

  playerChoiceEl.textContent = emojis[userChoice];
  computerChoiceEl.textContent = emojis[computerChoice];

  if (result === 0) {
    score.tie++;
    resultTitle.textContent = 'Tie!';
    tieCount.textContent = score.tie;
  } else if (result === 1) {
    score.win++;
    resultTitle.textContent = 'You Win!';
    winCount.textContent = score.win;
  } else {
    score.lose++;
    resultTitle.textContent = 'You lose';
    loseCount.textContent = score.lose;
  }

  localStorage.setItem('score', JSON.stringify(score));
}

resetButton.addEventListener('click', () => {
  score = { tie: 0, win: 0, lose: 0 };
  localStorage.setItem('score', JSON.stringify(score));
});
