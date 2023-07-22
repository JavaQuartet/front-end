import React from "react";
import { Routes, Route, Link } from "react-router-dom";

//자체작성 페이지 or 컴포넌트
import Club from "./pages/club.js";
import Community from "./pages/community.js";
import MyPage from "./pages/myPage.js";
import Main from "./pages/main.js";

//스타일시트 파일
import "./stylesheet/App.scss";

function App() {
  return (
    <div className="App">
      <div className="Navbar">
        <span>
          <p>
            <Link to="/" style={{ textDecoration: "none", color: "#1a780b" }}>
              Plow
            </Link>
          </p>
        </span>
        <div className="main-list">
          <ul>
            <li>
              <Link
                to="/club"
                style={{ textDecoration: "none", color: "#1a780b" }}
              >
                모임
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                style={{ textDecoration: "none", color: "#1a780b" }}
              >
                커뮤니티
              </Link>
            </li>
            <li>
              <Link
                to="/myPage"
                style={{ textDecoration: "none", color: "#1a780b" }}
              >
                마이페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/club" element={<Club />} />
        <Route path="/community" element={<Community />} />
        <Route path="/" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
