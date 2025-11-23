import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showMessages, setShowMessages] = useState(false);
  const [step, setStep] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  const messages = [
    "วันนี้คุณเป็นยังไงบ้างยังสบายดีไหม",
    "เข้ามาเล่นเว็บเราคงจะเหนื่อยมากเลยอะสิ",
    "ถ้าคุณท้อแท้หรือคุณเครียด ที่นี่จะช่วยให้คุณรู้สึกดีขึ้น 💗"
  ];

  const handleRelax = () => {
    setShowMessages(true);
  };

  // --- แสดงข้อความทีละบรรทัด ---
  useEffect(() => {
    if (!showMessages) return;

    if (step < messages.length) {
      const timer = setTimeout(() => setStep(step + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showMessages, step]);

  // --- ข้อความครบแล้วค่อยให้ Navbar เฟดเข้า ---
  useEffect(() => {
    if (step === messages.length) {
      setTimeout(() => {
        setShowNavbar(true);
      }, 600);
    }
  }, [step]);

  return (
    <div className="home-container">

      {/* 🌸 ฟองลอยพาสเทล */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      {/* Navbar เฟดทีหลัง */}
      <Navbar visible={showNavbar} />

      {/* Title */}
      <h1 className="welcome-title">
        WELCOME TO <span>CARE YOU</span>
      </h1>

      {/* Relax → hide after click */}
      {!showMessages ? (
        <button className="relax-btn" onClick={handleRelax}>
          Relax
        </button>
      ) : (
        <div className="messages-box">
          
          {/* แสดงข้อความทีละบรรทัด */}
          {messages.slice(0, step).map((msg, index) => (
            <p key={index} className="fade-message">
              {msg}
            </p>
          ))}

          {/* เมื่อครบ 3 บรรทัด → แสดงปุ่มเลือกเมนู */}
          {step === messages.length && (
            <div className="menu-buttons">
              <button onClick={() => navigate("/games")}>Games</button>
              <button onClick={() => navigate("/chatAI")}>Chat AI</button>
              <button onClick={() => navigate("/Profile")}>Profile</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
