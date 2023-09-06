import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../stylesheet/login.scss";

function Login({ setUser }) {

    let [email, setEmail] = useState('');
    let [pw, setPw] = useState('');

    const fetchURL = "http://3.39.75.222:8080";

    let navigate = useNavigate();


    return (
        <div className="login-background">
            <p>Plowithme</p>
            <div className="login-main">
                <div className="input-wrapper">
                    <input onChange={(e)=>{
                        setEmail(e.target.value);
                    }} placeholder="아이디" id="id" />
                </div>
                <div className="input-wrapper">
                    <input onChange={(e)=>{
                        setPw(e.target.value);
                    }} type="password" placeholder="패스워드" id="password" />
                </div>
                <div className="input-wrapper">
                    <button onClick={(e)=>{
                        axios.post(fetchURL + '/auth/login', {
                            email: email,
                            password: pw
                        }).then((result) => {
                            let accessToken = result.data.data.accessToken; 
                            sessionStorage.setItem("accessToken", accessToken);
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
                                navigate('/mypage');
                              }).catch((e) => {
                                alert(e.message);
                              })
                        })
                        .catch((e) => {
                            if(e.response.status === 400){
                                alert('이메일과 비밀번호를 확인해주세요!')
                            }
                            else if(e.response.status === 404){
                                alert('존재하지 않는 회원입니다');
                            }
                        })
                    }} className="Login" type="button">
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
