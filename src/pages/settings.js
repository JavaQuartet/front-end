import React from "react";
import "../stylesheet/settings.scss";

import { useNavigate } from "react-router-dom";

function Settings() {

    let navigate = useNavigate();

    return (
        <div className="settings">
            <div className="grid-container">
                <h2>계정 설정</h2>
                <div />
                <h4>이름</h4><input />
                <h4>이메일</h4><input />
                <h4>비밀번호</h4><input />
                <h4>지역</h4><input />
                <div />
                <div className="buttons">
                    <button onClick={()=>{navigate('/mypage');}}>저장</button>
                    <button onClick={()=>{navigate('/mypage');}}>취소</button>
                </div>
            </div>
        </div>
    )
}


export default Settings;