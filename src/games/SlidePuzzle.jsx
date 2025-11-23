import React, { useState, useEffect } from "react";
import "./slidepuzzle.css";
import { Link } from "react-router-dom";

export default function SlidePuzzle() {
  const goal = [1,2,3,4,5,6,7,8,0]; // 0 = ช่องว่าง

  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const [tiles, setTiles] = useState(shuffle(goal));
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (JSON.stringify(tiles) === JSON.stringify(goal)) {
      setWon(true);
    }
  }, [tiles]);

  const moveTile = (index) => {
    const empty = tiles.indexOf(0);
    const validMoves = [
      empty - 1, // left
      empty + 1, // right
      empty - 3, // up
      empty + 3, // down
    ];

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[empty]] = [newTiles[empty], newTiles[index]];
      setTiles(newTiles);
    }
  };

  const resetGame = () => {
    setTiles(shuffle(goal));
    setWon(false);
  };

  return (
    <div className="puzzle-container">
      <Link to="/games" className="back-btn">← Back</Link>

      <h1 className="puzzle-title">Slide Puzzle 🟦</h1>

      {won && <p className="win-text">🎉 You Win! 🎉</p>}

      <div className="puzzle-grid">
        {tiles.map((num, index) => (
          <div
            key={index}
            className={`tile ${num === 0 ? "empty" : ""}`}
            onClick={() => moveTile(index)}
          >
            {num !== 0 ? num : ""}
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>Shuffle Again</button>
    </div>
  );
}
