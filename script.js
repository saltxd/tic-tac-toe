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

// //createPlayer objects

// const createPlayer = (name, symbol) => {
//     return {name, symbol};
// }

// const player1 = createPlayer('Player 1', 'X');
// const player2 = createPlayer('Player 2', 'O');

// //Object to control flow of game

// const gameController = (() => {
//     let currentPlayer = player1;

//     const switchPlayer = () => {
//         currentPlayer = currentPlayer === player1 ? player2 : player1;
//     }

//     return {
//         switchPlayer
//     };
// })();

const Player = (name, symbol) => {
    const getName = () => {
        return name;
    }

    const getSymbol = () => {
        return symbol;
    }

    return {
        getName,
        getSymbol
    };
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

let currentPlayer = player1;

const render = () => {
    const board = Gameboard.getBoard();
    const cells = document.querySelectorAll('#gameboard .cell')
      for (let i = 0; i < cells.length; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        cells[i].textContent = board[row][col];
      }
}

const handleCellClick = (e) => {
    const cell = e.target;
    const index = Array.from(cell.parentElement.children).indexOf(cell);
    const row = Math.floor(index / 3);
    const col = index % 3;

    //check if selected cell is already occupied
    if (Gameboard.getBoard()[row][col] !== '') {
        alert('This cell is already occupied!');
        return;
    }
}

//place the symbol on the game board
Gameboard.placeSymbol(row, col, currentPlayer.getSymbol());

//render the updated game board
render();

//check if game is over
if(checkForWinner()) {
    alert(`${current.Player.getName()} wins!`);
    resetGame();
    return;
} else if (checkForTie()) {
    alert('It\'s a tie!');
    resetGame
}