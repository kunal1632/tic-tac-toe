const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGame = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// let create a function to initialise the game
function initGame() {
  currPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // reseting the css to remove the green background
    box.classList = ` box box${index + 1}`;
  });
  newGame.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();

function swapTurn() {
  if (currPlayer === "X") {
    currPlayer = "O";
  } else {
    currPlayer = "X";
  }

  gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // check if winner is x
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }

    if (answer !== "") {
      gameInfo.innerText = `Winner Player - ${answer}`;
      newGame.classList.add("active");
      return;
    }

    // let check the draw considtion
    let fillCount = 0;
    gameGrid.forEach((box) => {
      if (box !== "") {
        fillCount++;
      }
    });
    if (fillCount === 9) {
      gameInfo.innerText = "Game Tied";
      newGame.classList.add("active");
    }
  });
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currPlayer;
    gameGrid[index] = currPlayer;
    boxes[index].style.pointerEvents = "none";
    // swap turn
    swapTurn();
    // check winning condition
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGame.addEventListener("click", initGame);
