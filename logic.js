document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const newGameButton = document.getElementById('new-game');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    let currentPlayer = 'X';
    let board = Array(9).fill(null);

    const startNewGame = () => {
        board = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        currentPlayer = 'X';
        hideModal();
    };

    const showModal = (message) => {
        modal.innerHTML = `
            <div class="modal-content">
                <p>${message}</p>
                <button id="restart-game">Перезапустить игру</button>
                <button id="close-modal">ОК</button>
            </div>
        `;
        modal.style.display = 'block';

        document.getElementById('restart-game').addEventListener('click', startNewGame);
        document.getElementById('close-modal').addEventListener('click', hideModal);
    };

    const hideModal = () => {
        modal.style.display = 'none';
    };

    const checkWinner = () => {
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
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return combination;
            }
        }

        return null;
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (board[index] || checkWinner()) {
            return;
        }
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            winner.forEach(index => {
                cells[index].classList.add('win');
            });
            showModal(`Игрок ${currentPlayer} победил!`);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    newGameButton.addEventListener('click', startNewGame);
});