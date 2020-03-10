console.log("we're online")

/*----- constants -----*/

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [6, 4, 2],
  [0, 4, 8]
]
/*----- app's state (variables) -----*/

let board;
let marker;
let computerMarker;
let possibleMoves;

function init(marker) {
  board = ['', '', '', '', '', '', '', '', ''];
  $('.outer-modal').css('display', 'none');
  render();
};

function render() {
  possibleMoves = [];
  board.forEach((marker, i) => {
    squares[i].textContent = marker;
    if (!marker) possibleMoves.push(i);
  })
}

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('.square'))

/*----- event listeners -----*/

$(".marker-button").click(function(e) {
  marker = e.target.innerHTML;
  computerMarker = (marker === "x") ? "o" : "x"
  init(marker);
});

$(".square").click((e) => handleTurn(e))


/*----- functions -----*/

function handleTurn(e) {
  let value = e.target.getAttribute("value")

  if (!Number(value) && Number(value) !== 0) {
    console.log("invalid move")
  } else {
    let idx = Number(value);

    let element = e.target;
    makeMove(marker, idx, "player", element);
  }
}

function makeMove(sessionMarker, idx, className, element) {
  board[idx] = sessionMarker;
  element.innerHTML = sessionMarker;
  element.classList.add(className)
  element.setAttribute("value", sessionMarker);

  render();

  let status = checkGameOver(sessionMarker);
  if (status === false) {
    if (className === "player") makeComputerMove();
  } else {
    let elementInner = Array.from($('.game-over-inner'))[0]
    $('.game-over-outer').css('display', 'flex');
    $('.game-over-inner').css("display", "flex");
    if (status === "draw") {
      elementInner.innerHTML = "DRAW."
    } else {
      elementInner.innerHTML = (sessionMarker === marker) ? "YOU ARE THE WINNER!" : "YOU LOSE."
    }
  }

}

function makeComputerMove() {
  let i = Math.floor(Math.random() * possibleMoves.length);
  let idx = possibleMoves[i];
  let element = $(`div[value=${idx}]`).toArray()[0]

  practice()
  makeMove(computerMarker, idx, "computer", element)
}

function checkGameOver(sessionMarker) {
  let gameOver = !!possibleMoves.length ? false : true;
  let winner;

  winningCombinations.forEach((combo, i) => {
    let left = combo[0]; let bLeft = board[left];
    let mid = combo[1]; let bMid = board[mid];
    let right = combo[2]; let bRight = board[right];

    if ((bLeft == sessionMarker) && (bMid == sessionMarker) && (bRight == sessionMarker)) winner = sessionMarker;
  });

  if (winner !== undefined) {
    return winner; // game over = true, winner = ("x" or "o")
  } else if (!gameOver) {
    return false // game over = false
  } else {
    return "draw"; // game over = true, no winner
  }
}