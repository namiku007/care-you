import React, { useEffect, useRef, useState } from "react";
import "./sandgame.css";
import { Link } from "react-router-dom";

export default function SandGame() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [drawing, setDrawing] = useState(false);
  const [sandColor, setSandColor] = useState("#ffd6a5");

  const colors = ["#ffd6a5", "#ffb3c6", "#c7ceea", "#b5ead7", "#ffe8a3"];

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 600;
    ctxRef.current = canvas.getContext("2d");

    // ปิดการ scroll ของหน้าจอเฉพาะบน canvas (สำคัญ!)
    canvas.addEventListener("touchmove", (e) => e.preventDefault(), {
      passive: false,
    });

    animateSand();
  }, []);

  function animateSand() {
    const ctx = ctxRef.current;
    const imgData = ctx.getImageData(0, 0, 500, 600);
    const data = imgData.data;

    for (let y = 598; y >= 0; y--) {
      for (let x = 0; x < 500; x++) {
        const index = (y * 500 + x) * 4;

        if (data[index + 3] !== 0) {
          const below = ((y + 1) * 500 + x) * 4;

          if (data[below + 3] === 0) {
            data[below] = data[index];
            data[below + 1] = data[index + 1];
            data[below + 2] = data[index + 2];
            data[below + 3] = 255;

            data[index + 3] = 0;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    requestAnimationFrame(animateSand);
  }

  // วาดจุดทราย
  function draw(x, y) {
    const ctx = ctxRef.current;
    ctx.fillStyle = sandColor;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Mouse Events
  function handleMouseDown() {
    setDrawing(true);
  }

  function handleMouseUp() {
    setDrawing(false);
  }

  function handleMouseMove(e) {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    draw(e.clientX - rect.left, e.clientY - rect.top);
  }

  // Touch Events
  function handleTouchStart(e) {
    e.preventDefault();
    setDrawing(true);
  }

  function handleTouchEnd() {
    setDrawing(false);
  }

  function handleTouchMove(e) {
    e.preventDefault();
    if (!drawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];

    draw(touch.clientX - rect.left, touch.clientY - rect.top);
  }

  return (
    <div className="sand-container">

      <Link to="/games" className="sand-back">← กลับ</Link>

      <h2 className="sand-title">Sand Game 🏜️</h2>
      <p className="sand-subtitle">วาดทรายนุ่ม ๆ ให้ไหลลงอย่างสบายใจ</p>

      <canvas
        ref={canvasRef}
        className="sand-canvas"

        // Mouse Events
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}

        // Touch Events
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      ></canvas>

      {/* ตัวเลือกสี */}
      <div className="sand-colors">
        {colors.map((c) => (
          <div
            key={c}
            className="sand-color"
            style={{ background: c }}
            onClick={() => setSandColor(c)}
          ></div>
        ))}
      </div>

      <button
        className="sand-clear"
        onClick={() => ctxRef.current.clearRect(0, 0, 500, 600)}
      >
        ล้างหน้าจอ
      </button>
    </div>
  );
}
