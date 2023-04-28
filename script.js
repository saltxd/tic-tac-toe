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

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    return {
        switchPlayer,
        getCurrentPlayer
    };
})();


const render = () => {
    const board = Gameboard.getBoard();
    const cells = document.querySelectorAll('#gameboard .cell')
      for (let i = 0; i < cells.length; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        cells[i].textContent = board[row][col];
        cells[i].setAttribute('data-row', row);
        cells[i].setAttribute('data-col', col);
      }
}

const cells = document.querySelectorAll('#gameboard .cell');
cells.forEach(cell => {
    cell.addEventListener('click', event => {
      const row = event.target.dataset.row;
      const col = event.target.dataset.col;
      const currentPlayer = gameController.getCurrentPlayer();
        if (Gameboard.getBoard()[row][col] === '') {
          Gameboard.placeSymbol(row, col, currentPlayer.symbol);
          render();
          gameController.switchPlayer();
        }
    });
  });
//render the updated game board
render();

