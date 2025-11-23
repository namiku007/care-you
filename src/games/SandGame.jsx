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

    animateSand();
  }, []);

  // อนิเมชันให้ทรายตกลง
  function animateSand() {
    const ctx = ctxRef.current;
    const imgData = ctx.getImageData(0, 0, 500, 600);
    const data = imgData.data;

    for (let y = 598; y >= 0; y--) {
      for (let x = 0; x < 500; x++) {
        const index = (y * 500 + x) * 4;

        // ถ้า pixel เป็นทราย
        if (data[index + 3] !== 0) {
          const below = ((y + 1) * 500 + x) * 4;

          // ถ้าด้านล่างว่าง → ตกลงได้
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

  // วาดทรายเมื่อเมาส์ลาก
  function drawSand(e) {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = ctxRef.current;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = sandColor;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  return (
    <div className="sand-container">
      
      <Link to="/games" className="sand-back">← กลับ</Link>

      <h2 className="sand-title">Sand Game 🏜️</h2>
      <p className="sand-subtitle">วาดทรายนุ่ม ๆ ให้ไหลลงอย่างสบายใจ</p>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="sand-canvas"
        onMouseDown={() => setDrawing(true)}
        onMouseUp={() => setDrawing(false)}
        onMouseMove={drawSand}
        onMouseLeave={() => setDrawing(false)}
      ></canvas>

      {/* สีทราย */}
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

      {/* ปุ่มล้างหน้าจอ */}
      <button className="sand-clear" onClick={() => ctxRef.current.clearRect(0, 0, 500, 600)}>
        ล้างหน้าจอ
      </button>
    </div>
  );
}
