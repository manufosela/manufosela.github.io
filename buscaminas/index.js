// Copyright 2021 manufosela
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const idGame = 'Buscaminas Game';
const numMines = 10;
const boardSize = 10; // cells
let cellSize = 50; // px
let flagCounter;
let board;
let boardDrawed;
let boardStatus;
let boardMines;

const texture = 'imagenes/texture.png';
const bombImage = 'imagenes/bomb.png';
const bombexplodeImage = 'imagenes/bomb-explode.png';
const flagImage = 'imagenes/flag.png';
const grassImage = 'imagenes/texturegrass.png';
const texture1 = 'imagenes/texture1.png';
const texture2 = 'imagenes/texture2.png';
const texture3 = 'imagenes/texture3.png';
const texture4 = 'imagenes/texture4.png';
const texture5 = 'imagenes/texture5.png';

let selected = 'grass';
const statuses = {
  texture,
  grass: grassImage,
  flag: flagImage,
  mine: bombImage,
  mineexplode: bombexplodeImage,
};
const textures = [
  texture,
  texture1,
  texture2,
  texture3,
  texture4,
  texture5,
];

function changeCellContent(cellx, celly, content) {
  const changeCellContentEvent = new CustomEvent(
    'board-cell-change-cell-content',
    {
      detail: {
        id: idGame,
        cellx,
        celly,
        content,
      },
    }
  );
  document.dispatchEvent(changeCellContentEvent);
}

function changeCellsContent(content) {
  const changeCellsContentEvent = new CustomEvent(
    'board-cell-change-cells-content',
    {
      detail: {
        id: idGame,
        content,
      },
    }
  );
  document.dispatchEvent(changeCellsContentEvent);
}

function getArrayCells(rows, cols, content) {
  const cells = [];
  for (let row = 0; row < rows; row += 1) {
    cells.push([]);
    for (let col = 0; col < cols; col += 1) {
      cells[row].push(content);
    }
  }
  return cells;
}

function resetArrays() {
  boardDrawed = getArrayCells(boardSize, boardSize, statuses.texture);
  boardStatus = getArrayCells(boardSize, boardSize, 0); // 0: nothing, 1: flag, 2: dude
  boardMines = getArrayCells(boardSize, boardSize, 0); // Store mines, and count mines around. Mine is M. Number 0 to 9 number mines around.
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function incrementMine(cellx, celly) {
  boardMines[cellx][celly] += 1;
}

function noMine(x, y) {
  return boardMines[x][y] !== 'M';
}

function incrementNumMines(cellx, celly) {
  for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
    for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
      if (
        cellx + offsetX >= 0 &&
        cellx + offsetX < boardSize &&
        celly + offsetY >= 0 &&
        celly + offsetY < boardSize &&
        noMine(cellx + offsetX, celly + offsetY)
      ) {
        incrementMine(cellx + offsetX, celly + offsetY);
      }
    }
  }
}

function setMines(rows, cols) {
  for (let mine = 0; mine < numMines; mine += 1) {
    const xMine = getRandomInt(cols);
    const yMine = getRandomInt(rows);
    if (boardMines[xMine][yMine] === 0) {
      boardMines[xMine][yMine] = 'M';
      incrementNumMines(xMine, yMine);
    } else {
      mine -= 1;
    }
  }
}

function initBoard() {
  const cols = board.getAttribute('cols');
  const rows = board.getAttribute('rows');
  changeCellsContent(boardDrawed);
  setMines(rows, cols);
}

function initBoardEvent(ev) {
  if (ev.detail.id === idGame) {
    initBoard();
  }
}

function restartGame() {
  const dialog = document.getElementById('endGame');
  dialog.style.display = 'none';
  dialog.close();
  resetArrays();
  initBoard();
  flagCounter = 0;
  const enableBoardClick = new CustomEvent(
    'board-cell-enable-board-click',
    {
      detail: {
        id: idGame,
      },
    }
  );
  document.dispatchEvent(enableBoardClick);
  document.getElementById('numMinesRemaining').innerHTML = numMines - flagCounter;  
}

function showModal(message) {
  const dialog = document.getElementById('endGame');
  dialog.innerHTML = `<h1>${message}</h1><button id="restart">Restart</button>`;
  dialog.showModal();
  document
    .getElementById('restart')
    .addEventListener('click', restartGame);
  dialog.style.display = 'flex';
}

function gameOver(x, y) {
  console.warn('You loose... BOMB!');
  changeCellContent(x, y, statuses.mineexplode);
  const disableBoardClick = new CustomEvent(
    'board-cell-disable-board-click',
    {
      detail: {
        id: idGame,
      },
    }
  );
  document.dispatchEvent(disableBoardClick);
  showModal('You loose... BOMB!');
}

function youWin() {
  console.warn('You Win!');
  confetti();
  const disableBoardClick = new CustomEvent(
    'board-cell-disable-board-click',
    {
      detail: {
        id: idGame,
      },
    }
  );
  document.dispatchEvent(disableBoardClick);
  showModal('You win!');
}

function uncoverCells(x, y) {
  if (boardDrawed[x][y] === statuses.texture) {
    if (boardMines[x][y] === 'M') {
      gameOver(x, y);
    } else if (boardMines[x][y] !== 0) {
      changeCellContent(x, y, textures[boardMines[x][y]]);
    } else {
      boardDrawed[x][y] = statuses.grass;
      changeCellContent(x, y, boardDrawed[x][y]);
      for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          if (
            x + offsetX >= 0 &&
            x + offsetX < boardSize &&
            y + offsetY >= 0 &&
            y + offsetY < boardSize &&
            boardDrawed[x + offsetX][y + offsetY] === statuses.texture
          ) {
            uncoverCells(x + offsetX, y + offsetY);
          }
        }
      }
    }
  }
}

function checkWin() {
  let success = 0;
  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      if (
        boardDrawed[row][col] === statuses.flag &&
        boardMines[row][col] === 'M'
      ) {
        success += 1;
      }
    }
  }
  return success === numMines;
}

function cellClick(ev) {
  const hasDrawed = boardDrawed[ev.detail.cellx][ev.detail.celly] !== statuses.texture;
  if (selected === 'flag') {
    // console.log(ev.detail.cellx, ev.detail.celly);
    if (boardStatus[ev.detail.cellx][ev.detail.celly] === 1) {
      changeCellContent(ev.detail.cellx, ev.detail.celly, statuses.texture);
      flagCounter -= 1;
      boardStatus[ev.detail.cellx][ev.detail.celly] = 0;
    } else if(flagCounter < numMines && !hasDrawed) {
      changeCellContent(ev.detail.cellx, ev.detail.celly, statuses.flag);
      if (flagCounter < numMines) {
        flagCounter += 1;
        boardStatus[ev.detail.cellx][ev.detail.celly] = 1;
      }
    }
    document.getElementById('numMinesRemaining').innerHTML =
      numMines - flagCounter;
    if (numMines - flagCounter === 0) {
      if (checkWin()) {
        youWin();
      }
    }
  } else {
    uncoverCells(ev.detail.cellx, ev.detail.celly);
  }
}

function createBoard(parentNode) {
  const boardCellElement = document.createElement('board-cell');
  boardCellElement.setAttribute('id', idGame);
  boardCellElement.setAttribute('cols', boardSize);
  boardCellElement.setAttribute('rows', boardSize);
  boardCellElement.setAttribute('cell-size', cellSize);
  boardCellElement.setAttribute('cell-text-color', '#ffffff');
  boardCellElement.setAttribute('grid-color', '#ffff00');
  // boardCellElement.setAttribute("hover-cell", "true");
  boardCellElement.setAttribute('title', idGame);
  boardCellElement.setAttribute('onclick', 'cellClick');
  parentNode.appendChild(boardCellElement);
  return boardCellElement;
}

function getWindowSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
}

function init() {
  const windowSize = getWindowSize();
  if (windowSize.width < boardSize * cellSize) {
    cellSize = windowSize.width / boardSize - 5;
  }
  resetArrays();
  flagCounter = 0;
  board = createBoard(document.getElementById('game'));
  document.addEventListener('wc-ready', initBoardEvent);

  document.getElementById('flag').addEventListener('click', ev => {
    [...document.querySelectorAll('button')].forEach(button => {
      button.classList.remove('selected');
    });
    ev.target.classList.toggle('selected');
    selected = 'flag';
  });
  document.getElementById('grass').addEventListener('click', ev => {
    [...document.querySelectorAll('button')].forEach(button => {
      button.classList.remove('selected');
    });
    ev.target.classList.toggle('selected');
    selected = 'grass';
  });

  document.getElementById('numMinesRemaining').innerHTML =
    numMines - flagCounter;
}

window.onload = init();