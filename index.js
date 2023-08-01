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

function createSquareGrid(containerClassName, size = 16) {
  const container = document.querySelector(`.${containerClassName}`);
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    const row = createDiv('row');
    container.appendChild(row);
    for (let colIndex = 0; colIndex < size; colIndex++) {
      row.appendChild(createDiv('cell'));
    }
  }
}

window.addEventListener('load', (e) => {
  createSquareGrid('canvas');
})