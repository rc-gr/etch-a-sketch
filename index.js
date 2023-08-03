const MIN_SQUARES_PER_SIDE = 1;
const MAX_SQUARES_PER_SIDE = 100;
const MAX_DARKENING_STEPS = 10;
const darkeningStepIncrement = 100 / MAX_DARKENING_STEPS;
let darkeningSteps = [];

function createDiv(classes, id = '') {
  const div = document.createElement('div');

  if (id !== '') {
    div.id = id;
  }
  
  if (typeof classes === 'string') {
    div.classList.add(classes);
  } else if (typeof classes === 'object') {
    for (item of classes) {
      div.classList.add(item);
    }
  }

  return div;
}

function createSquareGrid(containerClassName, squaresPerSide = 16) {
  darkeningSteps = [...Array(squaresPerSide * squaresPerSide)];
  const container = document.querySelector(`#${containerClassName}`);
  let index = 0;
  for (let rowIndex = 0; rowIndex < squaresPerSide; rowIndex++) {
    const row = createDiv('row');
    container.appendChild(row);
    for (let colIndex = 0; colIndex < squaresPerSide; colIndex++) {
      row.appendChild(createDiv('cell', `cell-${index}`));
      darkeningSteps[index] = 0;
      index++;
    }
  }
}

function addNewCanvasListener() {
  document.querySelector('#new-canvas')
    .addEventListener('click', newCanvas);
}

function getRandomHueDeg() {
  return Math.floor(Math.random() * 361);
}

function updateBackgroundColor(event) {
  const cell = event.target;
  const cellIndex = +cell.id.substr(5);
  const darkeningStep = Math.min(darkeningSteps[cellIndex] + 1, MAX_DARKENING_STEPS);
  cell.style.backgroundColor = 
    `hsl(${getRandomHueDeg()}deg 50% ${100 - darkeningStep * darkeningStepIncrement}%)`;
  darkeningSteps[cellIndex] = darkeningStep;
}

function addCellListeners() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('mouseenter', updateBackgroundColor);
  });
}

function createCanvas(squaresPerSide = 16) {
  createSquareGrid('canvas', squaresPerSide);
  addCellListeners();
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

  document.querySelector('#canvas')
    .replaceChildren();
  createCanvas(numberOfSquares);
}

function main() {
  createCanvas();
  addNewCanvasListener();
}

window.addEventListener('load', main);