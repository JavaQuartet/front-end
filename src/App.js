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
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/club" element={<Club />} />
                <Route path="/community" element={<Community />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
        </div>
    );
}

export default App;
