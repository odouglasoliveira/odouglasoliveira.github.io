const createColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
};

const generateBallColor = () => {
  const balls = document.getElementsByClassName('ball');
  for (let i = 0; i < balls.length; i += 1) {
    balls[i].style.background = createColor();
  }
  return balls;
};
generateBallColor();

let randomNumber = Math.floor(Math.random() * 6);
const balls = document.getElementsByClassName('ball');
let randomColor = balls[randomNumber].style.background;
const page = document.getElementById('rgb-color');

const showColor = () => {
  page.innerText = randomColor;
};
showColor();

const answer = document.getElementById('answer');

function addScore(response) {
  const score = document.getElementById('score');
  let scoreNumber = Number(score.textContent);
  if (response) {
    scoreNumber += 3;
    score.innerText = scoreNumber;
  } else {
    score.innerText = 0;
  }
}

const revealAnswer = () => {
  window.addEventListener('click', (event) => {
    if (event.target.className === 'ball') {
      if (randomColor === event.target.style.backgroundColor) {
        answer.innerText = 'Acertou!';
        addScore(true);
      } else {
        answer.innerText = 'Errou! Tente novamente!';
        addScore(false);
      }
    }
  });
};
revealAnswer();

function restartGame() {
  const button = document.getElementById('reset-game');
  button.addEventListener('click', () => {
    createColor();
    generateBallColor();
    randomNumber = Math.floor(Math.random() * 6);
    randomColor = balls[randomNumber].style.background;
    showColor();
    answer.innerText = 'Escolha uma cor';
  });
}
restartGame();
