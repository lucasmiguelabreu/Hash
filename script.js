const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const statusMessage = document.getElementById('statusMessage');
let oTurn;
let selectedCell = null;

startGame();

restartButton.addEventListener('click', startGame);
document.addEventListener('keydown', handleKeyPress);

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.classList.remove('selected');
        cell.textContent = '';  // Limpa o conteúdo das células
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick);
    });
    setBoardHoverClass();
    statusMessage.textContent = '';
    selectedCell = null;
}

function handleClick(e) {
    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }
    selectedCell = e.target;
    selectedCell.classList.add('selected');
}

function handleKeyPress(e) {
    if (!selectedCell) return;
    if (e.key === 'x' || e.key === 'o') {
        const currentClass = e.key === 'x' ? X_CLASS : O_CLASS;
        if (selectedCell.classList.contains(X_CLASS) || selectedCell.classList.contains(O_CLASS)) {
            return;
        }
        placeMark(selectedCell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false, currentClass);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
        selectedCell.classList.remove('selected');
        selectedCell = null;
    }
}

function endGame(draw, winningClass) {
    if (draw) {
        statusMessage.textContent = 'Empate!';
    } else {
        statusMessage.textContent = `${winningClass.toUpperCase()} Venceu!`;
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();  // Adiciona o texto X ou O na célula
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
