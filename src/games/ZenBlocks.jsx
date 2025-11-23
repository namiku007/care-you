import React, { useState, useEffect } from "react";
import "./zenblocks.css";
import { Link } from "react-router-dom";

// ⭐ เพิ่มเสียงที่นี่
import blockSound from "../sounds/block.mp3";
import clearSound from "../sounds/clear.mp3";

export default function ZenBlocks() {
  const [board, setBoard] = useState(
    Array(6)
      .fill(null)
      .map(() => Array(6).fill(null))
  );

  const [currentBlock, setCurrentBlock] = useState(null);

  useEffect(() => {
    spawnBlock();
  }, []);

  // ⭐ ฟังก์ชันเล่นเสียง
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.volume = 0.7;
    audio.play();
  };

  // สร้างบล็อกใหม่
  function spawnBlock() {
    const colors = ["#FFD1DC", "#C3E5FF", "#FFE8A3", "#D7FFDA", "#E0C3FC"];
    const block = {
      id: Date.now(),
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setCurrentBlock(block);
  }

  // วางบล็อกบนกระดาน
  function placeBlock(r, c) {
    if (board[r][c] !== null) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = currentBlock.color;
    setBoard(newBoard);

    playSound(blockSound); // ⭐ เสียงตอนวางบล็อก

    checkClear(newBoard);
    spawnBlock();
  }

  // เคลียร์แถวถ้าครบทั้งแถว
  function checkClear(newBoard) {
    let cleared = false;

    for (let r = 0; r < 6; r++) {
      if (newBoard[r].every((cell) => cell !== null)) {
        newBoard[r] = Array(6).fill(null);
        cleared = true;
      }
    }

    if (cleared) {
      setBoard([...newBoard]);
      playSound(clearSound); // ⭐ เสียงตอนเคลียร์แถว
    }
  }

  return (
    <div className="zen-container">
      <Link to="/games" className="zen-back">← Back</Link>

      <h2 className="zen-title">Zen Blocks 🧘</h2>
      <p className="zen-subtitle">วางบล็อกช้า ๆ คลายความคิด</p>

      {/* บล็อกที่จะวาง */}
      {currentBlock && (
        <div
          className="current-block"
          style={{ background: currentBlock.color }}
        ></div>
      )}

      {/* กระดาน */}
      <div className="zen-board">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="zen-cell"
              style={{ background: cell ? cell : "rgba(255,255,255,0.6)" }}
              onClick={() => placeBlock(r, c)}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}
