const colorPalette = document.querySelectorAll('.color');
console.log(colorPalette[1].style.backgroundColor);
function geraCorAleatoria() {
  const button = document.getElementById('button-random-color');
  button.addEventListener('click', () => {
    for (let color of colorPalette) {
      if (color.className.includes('black')) {
        color.style.backgroundColor = 'rgb(0,0,0)';
      } else {
        color.style.backgroundColor = `${`#${parseInt((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0')}`}`;
      }
    }
    savePalette();
  });
}

function savePalette() {
  const colors = document.querySelectorAll('.color');
  const savedPalette = [];
  for (let i = 0; i < colors.length; i += 1) {
    savedPalette.push(colors[i].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', savedPalette);
}

function restorePalette() {
  const colors = document.getElementsByClassName('color');
  if (localStorage.getItem('colorPalette')) {
    const colorPalette = localStorage.getItem('colorPalette').split('),');
    for (let i = 0; i < colors.length; i += 1) {
      colors[i].style.backgroundColor = colorPalette[i];
    }
  } else {
    colors[0].style.backgroundColor = 'rgb(0,0,0)';
  }
  return colors;
}

window.onload = () => {
  restorePalette();
  restauraPintura();
  geraCorAleatoria();
};

function createPixel() {
  const pixelBoard = document.getElementById('pixel-board');
  const newPixel = document.createElement('div');
  newPixel.className = 'pixel';
  pixelBoard.appendChild(newPixel);
  return pixelBoard;
}

function selectColor() {
  const colorPalette = document.getElementById('color-palette');
  colorPalette.addEventListener('click', (event) => {
    if (event.target.className.includes('color')) {
      document.getElementsByClassName('selected')[0].classList.remove('selected');
      event.target.classList.add('selected');
    }
  });
}
selectColor();

function paintPixels() {
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.addEventListener('click', (event) => {
    if (event.target.className.includes('pixel')) {
      const selectedColor = document.getElementsByClassName('selected')[0].style.backgroundColor;
      event.target.style.backgroundColor = selectedColor;
      salvaPintura();
    }
  });
}
paintPixels();

function clearBoard() {
  const button = document.getElementById('clear-board');
  button.addEventListener('click', () => {
    const pixels = document.getElementsByClassName('pixel');
    for (const pixel of pixels) {
      pixel.style.backgroundColor = 'white';
    }
    salvaPintura();
    return pixels;
  });
}
clearBoard();

function salvaPintura() {
  const board = document.getElementById('pixel-board').innerHTML;
  localStorage.setItem('pixelBoard', board);
}

function restauraPintura() {
  const board = document.getElementById('pixel-board');
  if (localStorage.getItem('pixelBoard')) {
    board.innerHTML = localStorage.getItem('pixelBoard');
  }
  return board;
}

function alteraBoardSize() {
  const input = document.getElementById('board-size');
  const button = document.getElementById('generate-board');
  const pixelBoard = document.getElementById('pixel-board');
  button.addEventListener('click', () => {
    let { value } = input;
    if (input.value && input.value <= 5) {
      value = 5;
    }
    if (input.value && input.value >= 50) {
      value = 50;
    }
    if (input.value) {
      pixelBoard.innerHTML = '';
      localStorage.removeItem('pixelQuantity');
      localStorage.setItem('boardSize', value);
      for (let i = 0; i < value * value; i += 1) {
        createPixel();
      }
    } else {
      window.alert('Board inválido!');
      for (let i = 0; i < 25; i += 1) {
        createPixel();
      }
    }
    const pixels = `${value * 42}px`;
    pixelBoard.style.width = pixels;
    localStorage.setItem('pixelQuantity', pixels);
  });
}
alteraBoardSize();

function restoreBoardSize() {
  const pixelBoard = document.getElementById('pixel-board');
  if (localStorage.getItem('pixelQuantity')) {
    pixelBoard.style.width = localStorage.getItem('pixelQuantity');
  }
  if (localStorage.getItem('boardSize')) {
    const pixels = localStorage.getItem('boardSize');
    pixelBoard.innerHTML = '';
    for (let i = 0; i < pixels * pixels; i += 1) {
      createPixel();
    }
  }
}
restoreBoardSize();

if (!localStorage.getItem('boardSize')) {
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.style.width = '210px';
  for (let i = 0; i < 25; i += 1) {
    createPixel();
  }
}
