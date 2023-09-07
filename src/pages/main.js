import React from "react";
import '../stylesheet/main.scss'
import { useNavigate } from "react-router-dom";

function Main() {

    let navigate = useNavigate();
    return (
        <div className="main">
            <div className="page">
                <h1>플로깅(plogging)이란?</h1>
                <div className="img-group">
                <img src="/jogging.jpg" alt="조깅사진"/>
                <h2>+</h2>
                <img src="/trashcan.jpg" alt="쓰레기통사진"/>
                </div>
                <p>조깅을 하면서 길가의 쓰레기를 수거하는, <br/> 운동을 하며 자연을 보호하는 활동</p>
            </div>
            <div className="page">
                <h1>"Plogging With Me"</h1>
                <h1><span>plowithme</span>에서는<br/>환경을 위하는 사람들이 모여<br/>함께 세상을 변화시킵니다.</h1>
            </div>
            <div className="page">
            <h1>
                환경을 위한 순간,<br/>
                지금 <span>plowithme</span>에서<br/>
                세상에서 가장 쉬운 플로깅 모임을<br/>
                시작하세요!
            </h1>
            <button onClick={()=>{
                navigate('/login')
            }}>
                plowithme 참여하기
            </button>
            <h2>지금 가까운 모임을 만들고 참여하세요!</h2>
            </div>
        </div>
    );
}

export default Main;
