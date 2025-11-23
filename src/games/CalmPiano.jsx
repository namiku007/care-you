import React from "react";
import "./calmpiano.css";
import { Link } from "react-router-dom";

import C from "../sounds/pianoC.mp3";
import D from "../sounds/pianoD.mp3";
import E from "../sounds/pianoE.mp3";
import F from "../sounds/pianoF.mp3";
import G from "../sounds/pianoG.mp3";
import B from "../sounds/pianoB.mp3";

export default function CalmPiano() {
  const keys = [
    { note: "C", sound: C, color: "#ffd6e8" },
    { note: "D", sound: D, color: "#ffe8cc" },
    { note: "E", sound: E, color: "#e7ffcc" },
    { note: "F", sound: F, color: "#ccf2ff" },
    { note: "G", sound: G, color: "#e5ccff" },
    { note: "B", sound: B, color: "#c7ceea" },
  ];

  function playSound(src) {
    const audio = new Audio(src);
    audio.volume = 0.6;
    audio.play();
  }

  return (
    <div className="piano-container">

      <Link to="/games" className="piano-back">← กลับ</Link>

      <h2 className="piano-title">Calm Piano 🎹</h2>
      <p className="piano-subtitle">ดนตรีเบา ๆ คลายอารมณ์</p>

      <div className="piano-keys">
        {keys.map((k) => (
          <div
            key={k.note}
            className="piano-key"
            style={{ background: k.color }}
            onClick={() => playSound(k.sound)}
          >
            {k.note}
          </div>
        ))}
      </div>

    </div>
  );
}
