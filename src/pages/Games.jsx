import React from "react";
import Navbar from "../components/Navbar";
import "./games.css";
import { Link } from "react-router-dom";

export default function Games() {
  return (
    <div className="games-container">

      {/* 🌸 Bubble Background */}
      <div className="bubble-bg">
        <div className="bubble small" style={{ left: "5%", animationDelay: "0s" }}></div>
        <div className="bubble medium" style={{ left: "15%", animationDelay: "1s" }}></div>
        <div className="bubble large" style={{ left: "28%", animationDelay: "2.5s" }}></div>
        <div className="bubble small" style={{ left: "42%", animationDelay: "0.7s" }}></div>
        <div className="bubble medium" style={{ left: "55%", animationDelay: "3s" }}></div>
        <div className="bubble large" style={{ left: "70%", animationDelay: "1.2s" }}></div>
        <div className="bubble small" style={{ left: "85%", animationDelay: "2s" }}></div>
        <div className="bubble medium" style={{ left: "92%", animationDelay: "4s" }}></div>
      </div>

      {/* Navbar */}
      <Navbar visible={true} />

      {/* Title */}
      <h1 className="games-title">CARE YOU GAMES 🎮</h1>
      <p className="games-subtitle">เลือกเกมที่ช่วยให้คุณรู้สึกดีขึ้น 💗</p>

      {/* 🌸 Relaxing Games */}
      <section className="game-section">
        <h2 className="section-title">🌸 Relaxing Games</h2>
        <div className="game-grid">

          <div className="game-card">
            <h3>Pop the Bubble 🎈</h3>
            <p>จิ้มฟองนุ่ม ๆ เพื่อคลายเครียด</p>
            <Link to="/play/bubble">
              <button>Play</button>
            </Link>
          </div>

          <div className="game-card">
            <h3>Breathing Exercise 🌬️</h3>
            <p>หายใจให้สบาย ใจเบาลง</p>
            <Link to="/play/breathing">
              <button>Play</button>
            </Link>
          </div>

          <div className="game-card">
            <h3>Glow Tapping ✨</h3>
            <p>แตะวงกลมเรืองแสงเพื่อผ่อนคลาย</p>
            <Link to="/play/glow">
              <button>Play</button>
            </Link>
          </div>

        </div>
      </section>

      {/* 🧩 Puzzle Games */}
      <section className="game-section">
        <h2 className="section-title">🧩 Puzzle Games</h2>
        <div className="game-grid">

          <div className="game-card">
            <h3>Slide Puzzle 🟦</h3>
            <p>เลื่อนบล็อกให้เข้าที่ คลายสมอง</p>
            <Link to="/play/slidepuzzle">
              <button>Play</button>
            </Link>
          </div>

          <div className="game-card">
            <h3>Color Match 🎨</h3>
            <p>จับคู่สีสุดละมุน</p>
            <Link to="/play/colormatch">
              <button>Play</button>
            </Link>
          </div>

          <div className="game-card">
            <h3>Zen Blocks 🧘</h3>
            <p>วางบล็อกช้า ๆ คลายความคิด</p>
            <Link to="/play/zen">
              <button>Play</button>
            </Link>
          </div>

        </div>
      </section>

      {/* 💖 Emotional Support */}
      <section className="game-section">
        <h2 className="section-title">💖 Emotional Support</h2>
        <div className="game-grid">

          <div className="game-card">
            <h3>Mood Painting 🎨</h3>
            <p>ระบายสีตามอารมณ์</p>
            <Link to="/play/moodpainting">
              <button>Play</button>
            </Link>
          </div>

          <div className="game-card">
            <h3>Stress Ball Soft 💗</h3>
            <p>บีบบอลนุ่ม ๆ ผ่อนคลาย</p>
            <Link to="/play/stressball">
              <button>Play</button>
            </Link>
          </div>

          <div className="game-card">
            <h3>Light Therapy 🌟</h3>
            <p>เล่นแสงสีเพื่อผ่อนคลายใจ</p>
            <Link to="/play/lighttherapy">
              <button>Play</button>
            </Link>
          </div>

        </div>
      </section>

      {/* ⭐ Recommended */}
      <section className="game-section">
        <h2 className="section-title">⭐ Recommended</h2>
        <div className="game-grid">

          <div className="game-card">
            <h3>Sand Game 🏜️</h3>
            <p>วาดทรายเล่นแบบเพลิน ๆ</p>
            <Link to="/sand">
              <button>Play</button>
            </Link>
          </div>

          <div className="game-card">
            <h3>Calm Piano 🎹</h3>
            <p>ฟังเปียโนผ่อนคลาย</p>
            <Link to="/piano">
              <button>Play</button>
            </Link>
          </div>

          <div className="game-card">
            <h3>Mandala Creator 🌀</h3>
            <p>ลงสีแมนดาลาเพลิน ๆ</p>
            <Link to="/mandala">
              <button>Play</button>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
