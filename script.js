const Gameboard = (() => {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
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