const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('.status');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Check for a win
const checkWin = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'Draw';
    }

    return null;
};

const handleClick = (cell, index) => {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? 'blue' : 'red';

        const winner = checkWin();

        if (winner) {
            if (winner === 'Draw') {
                status.textContent = 'It\'s a Draw!';
            } else {
                status.textContent = `Player ${winner} wins!`;
            }
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index));
});

