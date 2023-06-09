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

    const checkForWinner = () => {
        //check rows
        for (let i = 0; i < 3; i++) {
          if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
              return board[i][0];
          }
        }
        
        //check columns
        for (let i = 0; i < 3; i++) {
          if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i];
          }
        }

        // Check diagonals
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
          return board[0][0];
        }

        if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }
        
        // Check for tie
        if (board.every(row => row.every(cell => cell !== ''))) {
          return 'tie';
        }

        // Game is not over yet
        return null;
    };


    return {
        getBoard,
        placeSymbol,
        clearBoard,
        checkForWinner
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

    const reset = () => {
      currentPlayer = player1;
    }

    const init = () => {
      currentPlayer = player1;
    }

    return {
        switchPlayer,
        getCurrentPlayer,
        reset,
        init
    };
})();

const turnIndicator = document.getElementById('turn-indicator');

const render = () => {
    const board = Gameboard.getBoard();
    const cells = document.querySelectorAll('#gameboard .cell')
    const currentPlayer = gameController.getCurrentPlayer() || player1;
    const nextPlayer = currentPlayer === player1 ? player2 : player1;
    turnIndicator.textContent = `Next player: ${nextPlayer.name} (${nextPlayer.symbol})`;
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
      const board = Gameboard.getBoard();
        if (board[row][col] === '') {
          Gameboard.placeSymbol(row, col, currentPlayer.symbol);
          render();
          gameController.switchPlayer();

          const winner = Gameboard.checkForWinner();
          if (winner !== null) {
            if (winner === 'tie') {
                alert('It\'s a tie!');
            } else {
                alert(`${winner} wins!`);
            }
            Gameboard.clearBoard();
            render();
            }
          }
    });
  });
//render the updated game board
render();

const resetButton = document.getElementById('reset-button');

const resetGame = () => {
    Gameboard.clearBoard();
    gameController.reset();
    turnIndicator.textContent = `Next player: ${player1.name} (${player1.symbol})`;
    render();
    turnIndicator.textContent = `Next player: Player 1 (X)`;
};

resetButton.addEventListener('click', resetGame);

window.addEventListener('load', () => {
  gameController.init();
  render();
});