import React from "react";
import Navbar from "../components/Navbar";
import "./profile.css";

export default function Profile() {
  const profilePic = "/images/Profile.jpg"; // ✅ ใช้รูปจาก public

  return (
    <div className="profile-page">
      <Navbar visible={true} />

      <div className="profile-card">
        <img src={profilePic} alt="profile" className="profile-img" />

        <h1 className="profile-name">GUN</h1>

        <p className="profile-text">
          ยินดีต้อนรับเข้าสู่เว็บไซต์ของผม เว็บนี้ทำขึ้นให้กับคนทุกเพศ ทุกวัยที่กำลังเคลียดหรือท้อแท้
          ขอให้คุณหายจากความทุกข์และความเศร้านะครับ
        </p>

        <p><strong>อายุ:</strong> 18ปี</p>
        <p><strong>งานอดิเรก:</strong> พัฒนาเว็บไซต์ เล่นเกม ดูการ์ตูน</p>
        <p><strong>ความสามารถ:</strong> React, JavaScript, UI/UX Design,Python</p>
      </div>
    </div>
  );
}
