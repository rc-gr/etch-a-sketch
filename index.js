const MIN_SQUARES_PER_SIDE = 1;
const MAX_SQUARES_PER_SIDE = 100;

function createDiv(classes) {
  const div = document.createElement('div');
  
  if (typeof classes === 'string') {
    div.classList.add(classes);
  } else if (typeof classes === 'object') {
    for (item of classes) {
      div.classList.add(item);
    }
  }

  return div;
}

function createSquareGrid(containerClassName, cellsPerRow = 16) {
  const container = document.querySelector(`.${containerClassName}`);
  for (let rowIndex = 0; rowIndex < cellsPerRow; rowIndex++) {
    const row = createDiv('row');
    container.appendChild(row);
    for (let colIndex = 0; colIndex < cellsPerRow; colIndex++) {
      row.appendChild(createDiv('cell'));
    }
  }
}

function newCanvas() {
  const numberOfSquaresString = prompt('Enter number of squares per side for the new canvas (1-100):', '16');
  const numberOfSquares = parseInt(numberOfSquaresString);
  
  if (isNaN(numberOfSquares) || 
      numberOfSquares < MIN_SQUARES_PER_SIDE || 
      numberOfSquares > MAX_SQUARES_PER_SIDE) {
    alert('Invalid input!');
    return;
  }

  document.getElementById('canvas')
    .replaceChildren();
  createSquareGrid('canvas', numberOfSquares);
  addCellListeners();
}

function addNewCanvasListener() {
  document.querySelector('.new-canvas')
    .addEventListener('click', newCanvas);
}

function handleCell(event) {
  const cell = event.target;
  cell.classList.add('cell-hovered');
}

function addCellListeners() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('mouseenter', handleCell);
  });
}

function main() {
  createSquareGrid('canvas');
  addCellListeners();
  addNewCanvasListener();
}

window.addEventListener('load', main);