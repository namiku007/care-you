import React, { useState, useEffect } from "react";
import "./glowtapping.css";
import { Link } from "react-router-dom";
import laserSoundFile from "../sounds/laser.mp3"; // ⭐ เพิ่มเสียง

export default function GlowTapping() {
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);

  // ⭐ ฟังก์ชันเล่นเสียงเลเซอร์
  function playLaserSound() {
    const laser = new Audio(laserSoundFile);
    laser.volume = 0.6; // ปรับความดัง (0–1)
    laser.play();
  }

  // ⬆ สร้างวงกลมใหม่ทุก 1 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      addCircle();
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // ⬆ ฟังก์ชันเพิ่มวงกลม
  function addCircle() {
    const newCircle = {
      id: Date.now(),
      x: Math.random() * 80 + 10 + "vw",
      y: Math.random() * 60 + 20 + "vh",
    };

    setCircles((prev) => [...prev, newCircle]);

    // ลบเองหลัง 1.5s
    setTimeout(() => {
      setCircles((prev) => prev.filter((c) => c.id !== newCircle.id));
    }, 1500);
  }

  // ⬆ เมื่อผู้เล่นแตะวงกลม
  function tapGlow(id) {
    playLaserSound(); // ⭐ เล่นเสียง
    setScore(score + 1);
    setCircles((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="glow-container">

      {/* ปุ่มกลับ */}
      <Link to="/games" className="back-btn">← กลับ</Link>

      <h2 className="glow-title">Glow Tapping ✨</h2>
      <p className="glow-score">Score: {score}</p>

      {/* วงกลม */}
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="glow-circle"
          style={{ left: circle.x, top: circle.y }}
          onClick={() => tapGlow(circle.id)}
        ></div>
      ))}
    </div>
  );
}
