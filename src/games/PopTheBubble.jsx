import React, { useState, useEffect } from "react";
import "./popbubble.css";
import { Link } from "react-router-dom";
import popSoundFile from "../sounds/pop.mp3"; // << ใส่ไฟล์เสียง

export default function PopTheBubble() {
  const [count, setCount] = useState(0);
  const [bubbles, setBubbles] = useState([]);

  // ฟังก์ชันเล่นเสียงฟองแตก
  function playPopSound() {
    const popSound = new Audio(popSoundFile);
    popSound.volume = 0.8;       // ความดัง (0–1)
    popSound.play();
  }

  // ฟังก์ชันสร้างฟองใหม่แบบสุ่ม
  function spawnBubble() {
    const id = Date.now() + Math.random();

    const newBubble = {
      id,
      size: Math.floor(Math.random() * 60) + 40, // ขนาด 40–100
      left: Math.random() * 80 + 10,             // 10–90%
      top: Math.random() * 70 + 10,              // 10–80%
    };

    setBubbles((prev) => [...prev, newBubble]);
  }

  // ให้ฟองเกิดเรื่อย ๆ ทุก 700 ms
  useEffect(() => {
    const interval = setInterval(spawnBubble, 700);
    return () => clearInterval(interval);
  }, []);

  // เมื่อจิ้มฟอง
  function popBubble(id) {
    playPopSound(); // 🔊 เล่นเสียงทันที
    setCount((prev) => prev + 1);
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="bubble-game-container">
      <h2 className="bubble-title">Pop the Bubble 🎈</h2>
      <p className="bubble-score">Popped: {count}</p>

      {/* ปุ่มกลับ */}
      <Link to="/games">
        <button className="back-btn">⬅ Back to Games</button>
      </Link>

      <div className="bubble-area">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="bubble"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.left}%`,
              top: `${b.top}%`,
            }}
            onClick={() => popBubble(b.id)}
          ></div>
        ))}
      </div>
    </div>
  );
}
