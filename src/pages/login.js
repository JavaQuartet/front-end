import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../stylesheet/login.scss";

function Login() {
    return (
        <div className="login-background">
            <p>Plowithme</p>
            <div className="login-main">
                <div className="input-wrapper">
                    <input placeholder="아이디" id="id" />
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="패스워드" id="password" />
                </div>
                <div className="input-wrapper">
                    <button className="Login" type="button">
                        로그인
                    </button>
                </div>
                <div>
                    <span className="question">아직 회원이 아니신가요?</span>
                    <span className="signUp">
                        <Link to="/signup" style={{ color: "black" }}>
                            회원가입
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
export default Login;
