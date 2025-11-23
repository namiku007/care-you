import React, { useState, useEffect, useRef } from "react";
import "./lighttherapy.css";
import { Link } from "react-router-dom";
import relaxingMusic from "../sounds/relaxing.mp3"; // เพลงพื้นหลัง

export default function LightTherapy() {
  const [color, setColor] = useState("#ff9aa2");

  const colors = [
    "#ff9aa2",
    "#ffb3c6",
    "#c7ceea",
    "#b5ead7",
    "#e2f0cb",
    "#ffd6a5",
    "#a7d0ff",
    "#ffd1dc",
    "#d7b2ff"
  ];

  // -----------------------------
  // ⭐ ระบบเสียงพื้นหลัง + ปรับเสียง
  // -----------------------------
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    audioRef.current = new Audio(relaxingMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current.play();

    return () => {
      audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // เปลี่ยนสีอัตโนมัติ
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * colors.length);
      setColor(colors[random]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // เอฟเฟกต์ตอนกด (แบบเดิม)
  function pulse() {
    const ball = document.querySelector(".lt-ball");
    ball.classList.add("pulse");
    setTimeout(() => ball.classList.remove("pulse"), 400);

    // เปลี่ยนสีทันทีตอนกด
    const random = Math.floor(Math.random() * colors.length);
    setColor(colors[random]);
  }

  return (
    <div className="lt-container" style={{ background: color }}>
      <Link to="/games" className="lt-back">← กลับ</Link>

      <h2 className="lt-title">Light Therapy 🌟</h2>
      <p className="lt-subtitle">ผ่อนคลายด้วยแสงสีที่เปลี่ยนอย่างนุ่มนวล</p>

      {/* วงกลมหลัก */}
      <div
        className="lt-ball"
        style={{ background: color }}
        onClick={pulse}
      ></div>

      {/* 🔮 ปุ่มฟองนุ่ม ๆ สำหรับกดเปลี่ยนสี */}
      <div
        className="lt-bubble-btn"
        onClick={pulse}
      ></div>

      {/* ปรับระดับเสียงเพลง */}
      <div className="lt-volume-box">
        <p>🔉 ปรับเสียงเพลง</p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="lt-volume-slider"
        />
      </div>
    </div>
  );
}
