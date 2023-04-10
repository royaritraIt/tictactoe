import './style.css'

const boardUI = document.getElementById('board');
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

const activeCell = [];


const players = ['x', 'o']


function userMove(ele, i, j, player=0) {
  const triggeredCell = activeCell.findIndex((item) => item[0] == i && item[1] == j)
  if (triggeredCell < 0) return;
  activeCell.splice(triggeredCell, 1)
  ele.innerText = players[player];
  board[j][i] = players[player];
  // check if game over
  const winner = checkWinner();
  if (winner.length) {
    const winText = document.createElement('p')
    winText.innerText = `winner is ${winner}`
    document.getElementById('app').appendChild(winText)
    return;
  }
  if (activeCell.length === 0 && !winner.length) {
    const winText = document.createElement('p')
    winText.innerText = `its a tie`
    document.getElementById('app').appendChild(winText)
    return;
  }
  if (!player) nextMove()
}

function nextMove() {
  const index = Math.floor(Math.random() * activeCell.length);
  const i = activeCell[index][0]
  const j = activeCell[index][1]
  const element = document.getElementById(`cell_${i}_${j}`)
  userMove(element, i, j, 1)
}

for(let i = 0; i < board.length; i++) {
  for(let j = 0; j < board[i].length; j++) {
    const cell = document.createElement('div');
    cell.id = `cell_${i}_${j}`
    cell.onclick = (evt) => userMove(evt.target, i, j);
    boardUI.appendChild(cell)
    activeCell.push([i,j])
  }
}


function checkWinner() {
  var winner = '';
  // vertically
  for ( let x = 0; x < board.length; x++) {
    if (board[x][0] == board[x][1] && board[x][2] == board[x][1]) {
      winner = board[x][0]
    }
  }

  // horizontally
  for ( let x = 0; x < board.length; x++) {
    if (board[0][x] == board[1][x] && board[2][x] == board[1][x]) {
      winner = board[0][x]
    }
  }

  // horizontally
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
    winner = board[1][1]
  }
  if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
    winner = board[1][1]
  }
  
  return winner
}