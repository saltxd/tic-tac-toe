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

const createPlayer = (name, symbol) => {
    return {name, symbol};
}

const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');