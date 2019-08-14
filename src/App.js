import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = board =>
  combos.map(combo => combo.map(cell => board[cell]))
        .map(boardCombo => (
          boardCombo.reduce((winner, cell)=>
          winner === cell ? winner : null,
          boardCombo[0]
        )
      )).filter(winner => winner)[0];

const makeMove = (board, clicked) => {
  if (board[clicked]) return board;

  const xs = board.filter(cell => cell == "X").length;
  const os = board.filter(cell => cell == "O").length;
  const nextMove = (xs === os) ? 'X' : 'O';

  let nextBoard = board.map((cell, i) => (
    (i === clicked) ? nextMove : cell
  ));

  return nextBoard;
};

function App() {
  const [board, setBoard] = useState([
    null, null, null,
    null, null, null,
    null, null, null,
  ]);

  const currentWinner = calculateWinner(board);

  if( currentWinner ) return [...Array(100)].map((o, i)=> (
    <span style={{
      left: (Math.random()*99)+'vw',
      animationDelay: (Math.random()*5)+'s',
      animationDuration: (4 + Math.random()*3)+'s',
    }}>{currentWinner}</span>
  ));

  return (
    <div className="App">
      {
        board.map((cell, i) => (
        <div className="cell" onClick={ ()=> setBoard(makeMove(board, i)) }>
            {cell}
        </div>

        ))
      }
    </div>
  );
}

export default App;
