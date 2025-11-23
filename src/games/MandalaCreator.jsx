import React, { useState, useRef, useEffect } from "react";
import "./mandala.css";
import { Link } from "react-router-dom";

// ใช้ไฟล์ SVG จาก public/mandalas
const mandalas = [
  { name: "Mandala 1", url: "/mandalas/mandala1.svg" },
  { name: "Mandala 2", url: "/mandalas/mandala2.svg" },
  { name: "Mandala 3", url: "/mandalas/mandala3.svg" },
  { name: "Mandala 4", url: "/mandalas/mandala4.svg" },
  { name: "Mandala 5", url: "/mandalas/mandala5.svg" },
  { name: "Mandala 6", url: "/mandalas/mandala6.svg" },
  { name: "Mandala 7", url: "/mandalas/mandala7.svg" },
  { name: "Mandala 8", url: "/mandalas/mandala8.svg" },
];

export default function MandalaCreator() {
  const [selectedColor, setSelectedColor] = useState("#ffb3c6");
  const [autoFill, setAutoFill] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const svgContainer = useRef(null);
  const canvasRef = useRef(null);

  const palette = [
    "#ffb3c6", "#ffd6e8", "#ffe8a3",
    "#d5f5c3", "#c6e7ff", "#e5ccff",
    "#c7ceea", "#ffd1dc", "#fff5aa",
    "#ffffff"
  ];

  // โหลด SVG ลงใน container ผ่าน fetch
  useEffect(() => {
    fetch(mandalas[currentIndex].url)
      .then(res => res.text())
      .then(svgText => {
        if (svgContainer.current) {
          svgContainer.current.innerHTML = svgText;
        }
      })
      .catch(err => console.error("Error loading SVG:", err));
  }, [currentIndex]);

  // ลงสี
  function colorSection(e) {
    if (!["path", "circle", "rect"].includes(e.target.tagName)) return;

    e.target.classList.add("glow");
    setTimeout(() => e.target.classList.remove("glow"), 250);

    if (!autoFill) {
      e.target.setAttribute("fill", selectedColor);
      return;
    }

    const allParts = svgContainer.current.querySelectorAll("path, circle, rect");
    allParts.forEach(p => p.setAttribute("fill", selectedColor));
  }

  // ล้างภาพ
  function resetMandala() {
    const allParts = svgContainer.current.querySelectorAll("path, circle, rect");
    allParts.forEach(p => p.setAttribute("fill", "white"));
  }

  // ดาวน์โหลด PNG (เวอร์ชันที่แก้ให้ render ได้แน่นอน)
  function downloadPNG() {
    const svgElement = svgContainer.current.querySelector("svg");
    if (!svgElement) return;

    let svgData = new XMLSerializer().serializeToString(svgElement);

    // เพิ่ม XML header + xmlns เพื่อให้ canvas อ่านได้
    if (!svgData.includes("xmlns")) {
      svgData = svgData.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    svgData = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgData;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = 600;
      canvas.height = 600;
      ctx.clearRect(0, 0, 600, 600);
      ctx.drawImage(img, 0, 0, 600, 600);

      const png = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = png;
      a.download = "mandala.png";
      a.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  }

  return (
    <div className="mandala-container">
      <Link to="/games" className="mandala-back">← กลับ</Link>

      <h2 className="mandala-title">Mandala Creator 🌀</h2>
      <p className="mandala-subtitle">สร้างลายแมนดาลาสวย ๆ ผ่อนคลายใจ</p>

      {/* เลือกลาย */}
      <div className="mandala-select">
        <label>เลือกลาย:&nbsp;</label>
        <select value={currentIndex} onChange={(e) => setCurrentIndex(Number(e.target.value))}>
          {mandalas.map((m, i) => (
            <option key={i} value={i}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* Auto fill toggle */}
      <div className="auto-fill-toggle">
        🌈 โหมดเติมสีอัตโนมัติ
        <input
          type="checkbox"
          checked={autoFill}
          onChange={() => setAutoFill(!autoFill)}
        />
      </div>

      {/* SVG Zone */}
      <div
        className="mandala-svg"
        ref={svgContainer}
        onClick={colorSection}
      ></div>

      {/* Colors */}
      <div className="mandala-colors">
        {palette.map((c) => (
          <div
            key={c}
            className={`mandala-color ${selectedColor === c ? "active" : ""}`}
            style={{ background: c }}
            onClick={() => setSelectedColor(c)}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button className="mandala-btn clear" onClick={resetMandala}>🧹 ล้างภาพ</button>
        <button className="mandala-btn download" onClick={downloadPNG}>📥 ดาวน์โหลด PNG</button>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}
