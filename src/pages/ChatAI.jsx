// src/pages/ChatAI.jsx
import React, { useState, useRef, useEffect } from "react";
import "./chatAI.css";
import Navbar from "../components/Navbar";

export default function ChatAI() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "สวัสดีค่ะ 💕 เราคือ Care You Chat นะ วันนี้รู้สึกยังไงบ้างคะ เล่าให้เราฟังได้เต็มที่เลยนะ",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // เลื่อนลงล่างสุดเมื่อมีข้อความใหม่
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // ข้อความของผู้ใช้
    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // ข้อความตอบกลับแบบคงที่ (ไม่เรียก API แล้ว)
    const botReply = {
      role: "bot",
      text:
        "ขอบคุณที่เล่าให้เราฟังนะคะ 🫧 ตอนนี้แชทบอทนี้กำลังอยู่ในช่วงพัฒนา ยังไม่สามารถใช้งานได้ในตอนนี้ " +
        "แต่ในอนาคตเราจะกลับมาช่วยพูดคุยและให้คำปรึกษากับคุณอย่างเต็มที่เลยค่ะ 💗",
    };

    // ใส่ดีเลย์นิดหน่อยให้ดูเหมือนกำลังพิมพ์
    setTimeout(() => {
      setMessages((prev) => [...prev, botReply]);
    }, 400);
  }

  // ปุ่มข้อความเร็ว ๆ
  function quickInsert(text) {
    setInput(text);
  }

  return (
    <div className="chat-page">
      <Navbar visible={true} />

      <div className="chat-wrapper">
        {/* ฝั่งซ้าย */}
        <div className="chat-info">
          <h1 className="chat-title">Care You Chat 🤍</h1>
          <p className="chat-subtitle">
            ที่นี่คือพื้นที่ปลอดภัยสำหรับเล่าเรื่อง ความเครียด ความรู้สึกต่าง ๆ ของคุณนะคะ
          </p>

          <div className="chat-pill-box">
            <div
              className="chat-pill"
              onClick={() => quickInsert("วันนี้รู้สึกเหนื่อยมากเลย")}
            >
              รู้สึกเหนื่อยมากเลย
            </div>
            <div
              className="chat-pill"
              onClick={() => quickInsert("ช่วงนี้เครียดเรื่องเรียนมากค่ะ")}
            >
              เครียดเรื่องเรียน 📚
            </div>
            <div
              className="chat-pill"
              onClick={() => quickInsert("อยากได้วิธีคลายเครียดแบบง่าย ๆ")}
            >
              อยากคลายเครียด 💭
            </div>
            <div
              className="chat-pill"
              onClick={() => quickInsert("รู้สึกเหงา อยากมีคนคุยด้วยค่ะ")}
            >
              รู้สึกเหงา 🕊️
            </div>
          </div>

          <p className="chat-note">
            * Care You ไม่ใช่หมอ แต่จะเป็นเพื่อนที่คอยรับฟังอย่างอ่อนโยนค่ะ 🌷
          </p>
        </div>

        {/* กล่องแชท */}
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-msg ${m.role === "user" ? "user" : "bot"}`}
              >
                {m.role === "bot" && <div className="chat-avatar bot-avatar">💗</div>}
                <div className="chat-bubble">{m.text}</div>
                {m.role === "user" && (
                  <div className="chat-avatar user-avatar">🙂</div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-row" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="อยากเล่าอะไรให้เราฟังมั้ยคะ… 💬"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">ส่ง</button>
          </form>
        </div>
      </div>
    </div>
  );
}
