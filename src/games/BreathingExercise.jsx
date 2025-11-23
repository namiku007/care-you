import React, { useState, useEffect } from "react";
import "./breathing.css";
import { Link } from "react-router-dom";

export default function BreathingExercise() {
  const [phase, setPhase] = useState("หายใจเข้า...");
  const [circleSize, setCircleSize] = useState(140);

  useEffect(() => {
    const cycle = () => {
      // 1) หายใจเข้า (4 วิ)
      setPhase("หายใจเข้า...");
      setCircleSize(240);

      // 2) กลั้นลม (3 วิ)
      setTimeout(() => {
        setPhase("กลั้นไว้...");
      }, 4000);

      // 3) ผ่อนลมหายใจ (4 วิ)
      setTimeout(() => {
        setPhase("ผ่อนลมหายใจ...");
        setCircleSize(140);
      }, 7000);
    };

    cycle();
    const interval = setInterval(cycle, 11000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="breathing-container">
      
      {/* ปุ่มกลับ */}
      <Link to="/games" className="back-btn">← กลับ</Link>

      <h2 className="breathing-title">Breathing Exercise 🌬️</h2>
      <p className="breathing-phase">{phase}</p>

      <div
        className="breathing-circle"
        style={{ width: circleSize, height: circleSize }}
      ></div>
    </div>
  );
}
