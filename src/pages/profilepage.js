import React from "react";
import "../stylesheet/myPage.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

function MyPage() {

  let navigate = useNavigate();

  let [modal, setModal] = useState(false);
  let [login, setLogin] = useState(true);
//   let [msgModal, setMsgModal] = useState(false);

  return (
    <div className="mypage-container">
      {
        modal ? 
        <div className="modal">
        <div className="profile-setting">
          <img className="profile-image" alt='프로필 사진' src="https://slp-statics.astockcdn.net/static_assets/staging/23spring/kr/home/curated-collections/card-1.jpg?width=580&format=webp"></img>
          <input className="nickname" value='닉네임' />
          <input className="intro-msg" value="자기소개글(상태메시지)" />
          <div className="buttons"> 
          <button onClick={()=>{ setModal(false); }}>저장</button>
          <button onClick={()=>{ setModal(false); }}>취소</button>
          </div>
        </div>
        </div>
        :
        null
      }
      <div className="left">
        <img className="profile-image" alt='프로필 사진' src="https://slp-statics.astockcdn.net/static_assets/staging/23spring/kr/home/curated-collections/card-1.jpg?width=580&format=webp"></img>
        <h2>닉네임</h2>
        <div className="intro-msg">자기소개글(상태메시지)</div>
        <div className="follow-info">
          <p>팔로워</p>
          <p>N명</p>
          <hr />
          <p>팔로잉</p>
          <p>N명</p>
        </div>
        <button onClick={()=>{setModal(true);}}>프로필 설정</button>
        <p className="setting" onClick={()=>{ navigate('/settings'); }}>계정 설정</p>
      </div>
      <div className="right">
        <div>
          <div className="info-circle"><h3>내가 수거한 쓰레기</h3><h1>3.4kg</h1></div>
          <div className="info-circle"><h3>총 플로깅한 거리</h3><h1>3.4km</h1></div>
        </div>
        <div className="my-plogging">
          <div className="title">
          <h2>My Plogging</h2>
          <p onClick={()=>{ navigate('/myploggings') }}>전체보기</p>
          </div>
          <div className="logs-container">
            <OneLog /><OneLog /><OneLog /><OneLog /><OneLog /><OneLog /><OneLog /><OneLog />
          </div>
        </div>
      </div>
    </div>
  );
}

function OneLog(){
    return(
      <div className="one-log">
        <img alt="플로깅 사진" src="https://img.freepik.com/free-photo/recycle-concept-with-woman-collecting-trash_23-2147825501.jpg?size=626&ext=jpg&ga=GA1.2.1645765076.1690271831&semt=sph" />
        <p>환경을 사랑하는 사람들끼리~</p>
      </div>
    )

}


export default MyPage;



/* 

<FontAwesomeIcon onClick={()=>{
        setMsgModal(!msgModal);
      }} className='alert' icon={faBell}/>
      {
        msgModal ?
        <div className="msg-modal">
          <div className="msg">
            <div className="msg-content">
            <img alt="팔로워 프로필 사진" src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg" />
            <p>tmdwn님이 댓글을 남겼습니다 "안녕하세요!"</p>
            </div>
          <hr />
          </div>
          <div className="msg">
            <div className="msg-content">
            <img alt="팔로워 프로필 사진" src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg" />
            <p>tmdwn님이 댓글을 남겼습니다 "안녕하세요!"</p>
            </div>
          <hr />
          </div>
        </div>
        :null
      }

*/