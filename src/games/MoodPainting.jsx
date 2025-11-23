import React, { useState } from "react";
import "./moodpainting.css";
import { Link } from "react-router-dom";

export default function MoodPainting() {
  const colors = [
    "#FFFFFF",          // ⭐ สีขาว (ลบเฉพาะจุด)
    "#FF9AA2", "#FFB7B2", "#FFDAC1",
    "#E2F0CB", "#B5EAD7", "#C7CEEA",
    "#A7D0FF", "#FFD1FD", "#FFF5AA"
  ];

  const [selectedColor, setSelectedColor] = useState("#FF9AA2");

  const emptyGrid = Array(16)
    .fill(null)
    .map(() => Array(16).fill("#ffffff"));

  const [board, setBoard] = useState(emptyGrid);

  function paint(r, c) {
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = selectedColor;
    setBoard(newBoard);
  }

  function clearBoard() {
    setBoard(emptyGrid);
  }

  return (
    <div className="mp-container">
      <Link to="/games" className="mp-back">← กลับ</Link>
      <button className="mp-clear" onClick={clearBoard}>🗑 ลบภาพ</button>

      <h2 className="mp-title">Mood Painting 🎨</h2>
      <p className="mp-subtitle">ระบายสีตามอารมณ์ของคุณ</p>

      <div className="mp-board">
        {board.map((row, r) =>
          row.map((col, c) => (
            <div
              key={`${r}-${c}`}
              className="mp-cell"
              style={{ background: col }}
              onClick={() => paint(r, c)}
            ></div>
          ))
        )}
      </div>

      <div className="mp-palette">
        {colors.map((c) => (
          <div
            key={c}
            className={`mp-color ${selectedColor === c ? "active" : ""}`}
            style={{ background: c, border: c === "#FFFFFF" ? "1px solid #ccc" : "" }}
            onClick={() => setSelectedColor(c)}
          ></div>
        ))}
      </div>
    </div>
  );
}
