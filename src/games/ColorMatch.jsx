import React, { useState, useEffect } from "react";
import "./colormatch.css";
import { Link } from "react-router-dom";
import clickSoundFile from "../sounds/match.mp3";

export default function ColorMatch() {
  const pastelColors = [
    "#ffb3c6", "#ffe5ec", "#c8d9ff", "#c6f5d9",
    "#ffd6a5", "#f5c4ff", "#bff0ff", "#ffd1dc"
  ];

  const [tiles, setTiles] = useState([]);
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);

  const clickSound = new Audio(clickSoundFile);

  // สร้างเกมใหม่
  function resetGame() {
    let colorPairs = [...pastelColors, ...pastelColors];
    colorPairs = colorPairs.sort(() => Math.random() - 0.5);

    const formattedTiles = colorPairs.map((color, index) => ({
      id: index,
      color,
      flipped: false,
    }));

    setTiles(formattedTiles);
    setOpened([]);
    setMatched([]);
    setScore(0);
  }

  // เริ่มเกมเมื่อเปิดครั้งแรก
  useEffect(() => {
    resetGame();
  }, []);

  // เมื่อกดเปิดไพ่
  function flipTile(id) {
    if (opened.length === 2 || opened.includes(id) || matched.includes(id))
      return;

    const newOpened = [...opened, id];
    setOpened(newOpened);

    if (newOpened.length === 2) {
      const [first, second] = newOpened;

      if (tiles[first].color === tiles[second].color) {
        clickSound.play();
        setMatched([...matched, first, second]);
        setScore((prev) => prev + 1);
      }

      setTimeout(() => setOpened([]), 600);
    }
  }

  const totalPairs = pastelColors.length;
  const isWin = score === totalPairs;

  return (
    <div className="cm-container">
      <Link to="/games" className="cm-back-btn">← Back</Link>

      <h2 className="cm-title">Color Match 🎨</h2>
      <p className="cm-score">Matched: {score}/{totalPairs}</p>

      <div className="cm-grid">
        {tiles.map((tile) => {
          const isFlipped = opened.includes(tile.id) || matched.includes(tile.id);

          return (
            <div
              key={tile.id}
              className={`cm-tile ${isFlipped ? "flipped" : ""}`}
              onClick={() => flipTile(tile.id)}
            >
              <div className="cm-inner">
                <div className="cm-front"></div>
                <div className="cm-back" style={{ backgroundColor: tile.color }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ปุ่มเล่นใหม่เมื่อชนะ */}
      {isWin && (
        <div className="cm-win-box">
          <p className="cm-win-text">เยี่ยมมาก! คุณจับคู่ครบหมดแล้ว 💖</p>
          <button className="cm-restart-btn" onClick={resetGame}>
            เล่นใหม่อีกครั้ง
          </button>
        </div>
      )}
    </div>
  );
}
