import React, { useState } from "react";
import "./stressball.css";
import { Link } from "react-router-dom";
import squeezeSoundFile from "../sounds/pop.mp3"; // ใช้เสียงเดิมได้เลย

export default function StressBall() {
  const [pressed, setPressed] = useState(false);

  const squeezeSound = new Audio(squeezeSoundFile);

  function pressBall() {
    setPressed(true);
    squeezeSound.play();

    setTimeout(() => {
      setPressed(false);
    }, 180); // เวลาเด้งคืน
  }

  return (
    <div className="sb-container">
      <Link to="/games" className="sb-back">← Back</Link>

      <h2 className="sb-title">Stress Ball Soft 💗</h2>
      <p className="sb-subtitle">บีบบอลนุ่ม ๆ ให้ใจเบาสบาย</p>

      <div
        className={`sb-ball ${pressed ? "pressed" : ""}`}
        onClick={pressBall}
      ></div>
    </div>
  );
}
