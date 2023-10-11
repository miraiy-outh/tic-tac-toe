let gameBoard = ['', '', '', '', '', '', '', '', ''];

let currentPlayer = true; // true - крестики, false - нолики
let win = -1;

const moveCross = document.querySelector('.move__cross');
const winCross = document.querySelector('.win__cross');
const moveZero = document.querySelector('.move__zero');
const winZero = document.querySelector('.win__zero');
const nowin = document.querySelector('.nowin');

const button = document.querySelector('.new-game');
button.addEventListener('click', startNewGame);

const cells = document.querySelectorAll('.grid-cell');
cells.forEach((cell) => {
    cell.addEventListener('click', handleClick);
})

function removeEventListeners() {
    cells.forEach((cell) => {
        cell.removeEventListener('click', handleClick);
    })
}

function render() {
    if (currentPlayer) {
        moveCross.classList.add('visible');
        moveZero.classList.remove('visible');
    } else {
        moveCross.classList.remove('visible');
        moveZero.classList.add('visible');
    }
    if (win === true) {
        moveCross.classList.remove('visible');
        moveZero.classList.remove('visible');
        winCross.classList.add('visible');
        removeEventListeners()
    }

    if (win === false) {
        moveCross.classList.remove('visible');
        moveZero.classList.remove('visible');
        winZero.classList.add('visible');
        removeEventListeners()
    }

    if (win === 2) {
        moveCross.classList.remove('visible');
        moveZero.classList.remove('visible');
        nowin.classList.add('visible');
        removeEventListeners()
    }
}

function handleClick() {
    this.removeEventListener('click', handleClick);

    let index = this.id;
    gameBoard[index] = currentPlayer;

    if (currentPlayer) {
        let cross = document.querySelector(`#cross${index}`);
        cross.classList.add('visible');
    } else {
        let zero = document.querySelector(`#zero${index}`);
        zero.classList.add('visible');
    }

    if (checkForWin(currentPlayer)) {
        win = currentPlayer;
        render();
        return;
    }

    if (!gameBoard.includes('')) {
        win = 2;
        render();
        return;
    }

    currentPlayer = currentPlayer === true ? false : true;
    render();
}

function checkForWin(player) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        if (gameBoard[winningCombos[i][0]] === player && gameBoard[winningCombos[i][1]] === player && gameBoard[winningCombos[i][2]] === player) return true;
    }

    return false;
}

function startNewGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = true;
    win = -1;

    cells.forEach((cell) => {
        cell.addEventListener('click', handleClick);
    });

    winCross.classList.remove('visible');
    winZero.classList.remove('visible');
    nowin.classList.remove('visible');

    for (let i = 0; i < 9; i++) {
        let cross = document.querySelector(`#cross${i}`);
        let zero = document.querySelector(`#zero${i}`);

        cross.classList.remove('visible');
        zero.classList.remove('visible');
    }

    render();
}

render();