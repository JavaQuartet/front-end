import React from "react";
import { Link } from "react-router-dom";

import "../stylesheet/signup.scss";

function SignUp() {
    return (
        <div className="signup-background">
            <p>Plowithme</p>
            <div className="signup-main">
                <div className="input-wrapper">
                    <input type="text" placeholder="이름" id="name" />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="생년월일" id="birth" />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="지역" id="local" />
                    <select name="local" className="local-select">
                        <option value="">지역</option>
                        <option value="서울">서울</option>
                        <option value="경기">경기</option>
                        <option value="부산">부산</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <input placeholder="아이디" id="id" />
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="패스워드" id="password" />
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="패스워드 확인" id="password" />
                </div>
                <div className="input-wrapper">
                    <button className="Login" type="button">
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
}
export default SignUp;
