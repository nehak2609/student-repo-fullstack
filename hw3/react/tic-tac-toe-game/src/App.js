import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//Board component to render sqaure component
function Board({ xIsNext, squares, onPlay }) {
  //defining handleClick funtion to update sqaures array holding board's state.
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  //determining game status - it checked if there is a winner, if yes, then it sets status msg to display winner, If NO, it shows whose turn is next.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //Rendering the board - displays 3x3 grid by rendering 9 sqaures and onSquareClick funct is passed to each sqaure to handle user interaction.
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//Main game controller
//using export default in front of function means we tell index.js that to use Game component as the top-level component.
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); //history- an array storing the state of the board after each move.
  const [currentMove, setCurrentMove] = useState(0); //the index of current move.
  const xIsNext = currentMove % 2 === 0; //boolean indicating if X's turn.
  const currentSquares = history[currentMove]; //the latest board state.

  //function handlePlay will be called by board component to update the game.[or updates the history with the new board state (nextSquares)].
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); //Removes any future moves (if jumping back)
    setCurrentMove(nextHistory.length - 1); ///Updates currentMove to the latest move
  }
  //Function for Jumping to Previous Moves
  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  //Rendering the Game - The Board component is displayed on the left, whereas move history list is displayed on the right.
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//Function to calculate Winners.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Rows
    [3, 4, 5], // Rows
    [6, 7, 8], // Rows
    [0, 3, 6], // Columns
    [1, 4, 7], // Columns
    [2, 5, 8], // Columns
    [0, 4, 8], // Diagonals
    [2, 4, 6], // Diagonals
  ];
  //It loops through all possible winning combinations
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
