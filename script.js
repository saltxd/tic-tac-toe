const Gameboard = (() => {
    let board = [
        ['X', 'O', ''],
        ['', 'X', ''],
        ['O', '', 'X']
    ];

    const getBoard = () => {
        return board;
    }

    const placeSymbol = (row, col, symbol) => {
        board[row][col] = symbol;
    }

    const clearBoard = () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    return {
        getBoard,
        placeSymbol,
        clearBoard
    };
})();

//createPlayer objects

const createPlayer = (name, symbol) => {
    return {name, symbol};
}

const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');

//Object to control flow of game

const gameController = (() => {
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    return {
        switchPlayer
    };
})();

const render = () => {
    const board = Gameboard.getBoard();
    const cells = document.querySelectorAll('#gameboard .cell')
    for (let i = 0; i < cells.length; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        cells[i].textContent = board[row][col];
    }
}

window.addEventListener('load', render);