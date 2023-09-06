import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

//자체작성 페이지 or 컴포넌트
import Club from "./pages/club.js";
import Community from "./pages/community.js";
import MyPage from "./pages/myPage.js";
import Main from "./pages/main.js";
import Settings from "./pages/settings.js";
import Navbar from "./components/navbar.js";
import MyPloggings from "./pages/myPloggings.js";
import ProfilePage from "./pages/profilepage.js";
import Login from "./pages/login.js";
import SignUp from "./pages/signUp.js";
//스타일시트 파일
import "./stylesheet/App.scss";

function App() {
    let [user, setUser] = useState({
        isLogin: false,
        id: "",
        email: "",
        name: "",
    });

    const fetchURL = "http://3.39.75.222:8080";

    useEffect(()=>{
        let accessToken = sessionStorage.getItem('accessToken');
        if(accessToken !== undefined){
            axios.get(fetchURL + "/me", {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }).then((result) => {
                console.log(result.data);
                setUser({
                    isLogin:true,
                    id: result.data.data.id,
                    email: result.data.data.email,
                    name: result.data.data.name
                });
              }).catch((e) => {
                alert(e.message);
              })
        }
    },[])

    return (
        <div className="App">
            <Navbar />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/club" element={<Club />} />
                <Route path="/community" element={<Community />} />
                <Route path="/mypage" element={<MyPage user={user} setUser={setUser} />} />
                <Route path="/myploggings" element={<MyPloggings />} />
                <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profilepage/:id" element={<ProfilePage user={user} />} />
            </Routes>
        </div>
    );
}

export default App;
