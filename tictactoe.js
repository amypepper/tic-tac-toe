const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const canvasElem = document.querySelector("canvas");
const playerOneElem = document.getElementById("player1-select");
const playerTwoElem = document.getElementById("player2-select");
const buttonElem = document.querySelector("button");
const messageElem = document.getElementById("message");
const gameboardElem = document.getElementById("gameboard");

let currentPlayer = playerOneElem.value;
let occupiedQuadrants = [];
let keySequence = [];
let selectorElem;
let selectorPosition;

context.fillStyle = "#39ac73";
context.fillRect(0, 0, 340, 340);

context.beginPath();
context.moveTo(105, 35);
context.lineTo(105, 245);
context.lineCap = "round";
context.lineWidth = "7";
context.lineJoin = "round";
context.strokeStyle = "#330066";
context.shadowColor = "#6600cc";
context.shadowOffsetX = "-2";
context.shadowOffsetY = "2";
context.stroke();

context.moveTo(180, 35);
context.lineTo(180, 245);
context.stroke();

// horizontal lines
context.moveTo(35, 105);
context.lineTo(245, 105);
context.stroke();

context.moveTo(35, 180);
context.lineTo(245, 180);
context.stroke();

function setPlayerOneSymbol(playerTwo) {
  if (playerTwo === "x") {
    playerOneElem.value = "o";
    currentPlayer = "o";
  }
  if (playerTwo === "o") {
    playerOneElem.value = "x";
    currentPlayer = "x";
  }
}

function setPlayerTwoSymbol(playerOne) {
  if (playerOne === "x") {
    playerTwoElem.value = "o";
    currentPlayer = "x";
  }
  if (playerOne === "o") {
    playerTwoElem.value = "x";
    currentPlayer = "o";
  }
}
function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  return {
    x,
    y,
  };
}

function disablePlayerSelection() {
  playerOneElem.setAttribute("disabled", "");
  playerTwoElem.setAttribute("disabled", "");
}

function findQuadrant(position) {
  const rowOne = position.y >= 35 && position.y <= 109;
  const rowTwo = position.y >= 110 && position.y <= 184;
  const rowThree = position.y >= 185 && position.y <= 258;

  const columnOne = position.x >= 32 && position.x <= 107;
  const columnTwo = position.x >= 108 && position.x <= 182;
  const columnThree = position.x >= 183 && position.x <= 256;

  if (columnOne && rowOne) {
    return 1;
  }
  if (columnTwo && rowOne) {
    return 2;
  }
  if (columnThree && rowOne) {
    return 3;
  }
  if (columnOne && rowTwo) {
    return 4;
  }
  if (columnTwo && rowTwo) {
    return 5;
  }
  if (columnThree && rowTwo) {
    return 6;
  }
  if (columnOne && rowThree) {
    return 7;
  }
  if (columnTwo && rowThree) {
    return 8;
  }
  if (columnThree && rowThree) {
    return 9;
  }
}

function addSymbol(quadrant) {
  context.fillStyle = "white";
  context.font = "48px tahoma";

  if (quadrant === 1) {
    if (currentPlayer === "x") {
      context.fillText("x", 57, 77);
    } else if (currentPlayer === "o") {
      context.fillText("o", 57, 77);
    }
  }
  if (quadrant === 2) {
    if (currentPlayer === "x") {
      context.fillText("x", 132, 77);
    } else if (currentPlayer === "o") {
      context.fillText("o", 132, 77);
    }
  }
  if (quadrant === 3) {
    if (currentPlayer === "x") {
      context.fillText("x", 207, 77);
    } else if (currentPlayer === "o") {
      context.fillText("o", 207, 77);
    }
  }
  if (quadrant === 4) {
    if (currentPlayer === "x") {
      context.fillText("x", 57, 154);
    } else if (currentPlayer === "o") {
      context.fillText("o", 57, 154);
    }
  }
  if (quadrant === 5) {
    if (currentPlayer === "x") {
      context.fillText("x", 132, 154);
    } else if (currentPlayer === "o") {
      context.fillText("o", 132, 154);
    }
  }
  if (quadrant === 6) {
    if (currentPlayer === "x") {
      context.fillText("x", 207, 154);
    } else if (currentPlayer === "o") {
      context.fillText("o", 207, 154);
    }
  }
  if (quadrant === 7) {
    if (currentPlayer === "x") {
      context.fillText("x", 57, 229);
    } else if (currentPlayer === "o") {
      context.fillText("o", 57, 229);
    }
  }
  if (quadrant === 8) {
    if (currentPlayer === "x") {
      context.fillText("x", 132, 229);
    } else if (currentPlayer === "o") {
      context.fillText("o", 132, 229);
    }
  }
  if (quadrant === 9) {
    if (currentPlayer === "x") {
      context.fillText("x", 207, 229);
    } else if (currentPlayer === "o") {
      context.fillText("o", 207, 229);
    }
  }
  if (quadrant) {
    occupiedQuadrants.push(quadrant);
  }

  determineEndOfGame();
  return currentPlayer === playerOneElem.value
    ? (currentPlayer = playerTwoElem.value)
    : (currentPlayer = playerOneElem.value);
}

function playTurn(e, position) {
  let quadrant;

  messageElem.innerHTML = "";

  if (e.screenX) {
    const mousePosition = getMousePosition(canvasElem, e);
    quadrant = findQuadrant(mousePosition);
  } else {
    quadrant = findQuadrant(position);
  }

  if (occupiedQuadrants.includes(quadrant)) {
    messageElem.innerHTML =
      "Oops! That space is occupied. Please choose a different square.";
  } else {
    addSymbol(quadrant);
  }
}

function createSelector() {
  const div = document.createElement("div");
  const att1 = document.createAttribute("class");
  att1.value = "selector";
  const att2 = document.createAttribute("id");
  att2.value = "selector";
  div.setAttributeNode(att1);
  div.setAttributeNode(att2);
  gameboardElem.appendChild(div);
}

function moveSelectorRight(position) {
  position.x = position.x + 75;
  selectorElem.style.left = `${position.x}px`;
  selectorElem.style.top = `${position.y}px`;
}

function moveSelectorLeft(position) {
  position.x = position.x - 75;
  selectorElem.style.left = `${position.x}px`;
  selectorElem.style.top = `${position.y}px`;
}

function moveSelectorDown(position) {
  position.y = position.y + 75;
  selectorElem.style.top = `${position.y}px`;
}
function moveSelectorUp(position) {
  position.y = position.y - 75;
  selectorElem.style.top = `${position.y}px`;
}

function determineEndOfGame() {
  if (occupiedQuadrants.length >= 9) {
    messageElem.innerHTML = 'Game Over! Click "New Game" button to play again.';
    canvasElem.removeEventListener("mousedown", playTurn);
  }
}

canvasElem.addEventListener("mousedown", (e) => playTurn(e));

canvasElem.addEventListener("click", (e) => {
  disablePlayerSelection();
});

buttonElem.addEventListener("click", (e) => document.location.reload());

playerOneElem.addEventListener("change", (e) => {
  return setPlayerTwoSymbol(playerOneElem.value);
});

playerTwoElem.addEventListener("change", (e) => {
  return setPlayerOneSymbol(playerTwoElem.value);
});

window.addEventListener("keydown", (e) => {
  if (e.code === "KeyS" && !keySequence.length) {
    disablePlayerSelection();
    createSelector();
    selectorElem = document.getElementById("selector");
    selectorPosition = {
      x: selectorElem.offsetLeft,
      y: selectorElem.offsetTop,
    };
    keySequence.push(e.code);
  }

  if (e.code === "ArrowRight" && keySequence[0] === "KeyS") {
    if (selectorPosition.x < 183) {
      moveSelectorRight(selectorPosition);
    }
  }

  if (e.code === "ArrowLeft" && keySequence[0] === "KeyS") {
    if (selectorPosition.x >= 108) {
      moveSelectorLeft(selectorPosition);
    }
  }

  if (e.code === "ArrowDown" && keySequence[0] === "KeyS") {
    if (selectorPosition.y < 183) {
      moveSelectorDown(selectorPosition);
    }
  }

  if (e.code === "ArrowUp" && keySequence[0] === "KeyS") {
    if (selectorPosition.y >= 110) {
      moveSelectorUp(selectorPosition);
    }
  }
  if (e.code === "Enter") {
    playTurn(e, selectorPosition);
  }
});
