import React, { useEffect } from "react";
import "../stylesheet/myPage.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Detail from '../components/detail.js'
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

function MyPage({ user, setUser }) {

  let navigate = useNavigate();

  let [isMine, setIsMine] = useState(false); //다른사람 페이지면 false, 내페이지면 true
  let [modal, setModal] = useState(false);

  let [logModal, setLogModal] = useState(false); //Plogging log 모달

  let [msgModal, setMsgModal] = useState(false);

  let fetchURL = 'http://43.200.172.177:8080';

  let [userInfo, setUserInfo] = useState({
    nickname: '',
    profileUrl: '',
    introduction: ''
  })

  let [counts, setCounts] = useState(0);
  let [distance, setDistance] = useState(0);
  let [logs, setLogs] = useState([])

  let accessToken = sessionStorage.getItem('accessToken');


  useEffect(() => {

    //내 마이페이지인지 확인
    axios.get(fetchURL + "/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((result) => {
      if (result.data.data.name === user.name) {
        setIsMine(true);
      }
      else {
        setIsMine(false);
      }
    }).catch((e) => {
      alert(e.message);
    })

    //유저 프로필 조회
    axios.get(fetchURL + `/users/${user.id}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((result) => {
      let tmp = result.data.data
      let newUserInfo = { ...userInfo };
      newUserInfo.nickname = tmp.nickname;
      newUserInfo.profileUrl = tmp.profile_url;
      newUserInfo.introduction = tmp.introduction;
      setUserInfo(newUserInfo);
    }).catch((e) => {
      alert(e.message);
    })

    //모임 횟수 조회
    axios.get(fetchURL + `/users/${user.id}/class-count`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((result) => {
      let tmp = result.data.data;
      setCounts(tmp);
    }).catch((e) => {
      alert(e.message);
    });

    //모임 거리 조회
    axios.get(fetchURL + `/users/${user.id}/class-distance`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((result) => {
      let tmp = result.data.data;
      setDistance(tmp);
    }).catch((e) => {
      alert(e.message);
    })

    //나의 모임 조회
    axios.get(fetchURL + `/class/me?category=0`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((result) => {
      let tmp = result.data.data;
      let tmpArr;
      axios.get("https://picsum.photos/v2/list")
        .then((result) => {
          tmpArr = result.data.sort(()=> Math.random()-0.5);
          // tmpArr = result.data;
          tmp.map((e, i) => {
            e.imgUrl = tmpArr[i].download_url;
          })
          setLogs(tmp);
        })
        .catch((e) => {
          alert(e.message);
        })
    }).catch((e) => {
      alert(e.message);
    })

  }, []);



  let [msgs, setMsgs] = useState([]);
  useEffect(() => {
    if (msgModal) {
      axios.get(fetchURL + '/messages/received', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((result) => {
        let tmp = result.data.data;
        console.log(tmp);
        setMsgs(tmp);
      }).catch((e) => {
        alert(e.message);
      })
    }
  }, [msgModal])


  return (
    <div className="mypage-container">
      <FontAwesomeIcon onClick={() => {
        setMsgModal(!msgModal);
      }} className='alert' icon={faBell} />
      {
        msgModal ?
          <div className="msg-modal">
            {
              msgs.length > 0 ?
                msgs.map((e, i) => {

                  return (
                    <div key={i} className="msg">
                      <div className="msg-content">
                        <img alt="팔로워 프로필 사진" src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg" />
                        <p>tmdwn님이 쪽지를 보냈습니다 "안녕하세요!"</p>
                      </div>
                      <hr />
                    </div>
                  )
                }) : <p className="empty">받은 쪽지가 없습니다!</p>
            }
          </div>
          : null
      }
      {
        logModal ? <Detail modalOpen={logModal} setModalOpen={setLogModal} /> : null
      }
      {
        modal ?
          <div className="modal">
            <div className="profile-setting">
              <img className="profile-image" alt='프로필 사진' src={userInfo.profileUrl}></img>
              <input className="nickname" id="new-nickname" defaultValue={userInfo.nickname} />
              <input className="intro-msg" id="new-introduction" defaultValue={userInfo.introduction} />
              <div className="buttons">
                <button onClick={() => { 
                  let newData = {
                    nickname: document.getElementById('new-nickname').value,
                    introduction: document.getElementById('new-introduction').value
                  }
                  console.log(newData);
                  axios.patch(fetchURL + `/users/${user.id}/profile`, newData, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                  }).then((result)=>{
                    axios.get(fetchURL + `/users/${user.id}/profile`, {
                      headers: {
                        Authorization: `Bearer ${accessToken}`
                      }
                    }).then((result) => {
                      let tmp = result.data.data
                      let newUserInfo = { ...userInfo };
                      newUserInfo.nickname = tmp.nickname;
                      newUserInfo.profileUrl = tmp.profile_url;
                      newUserInfo.introduction = tmp.introduction;
                      setUserInfo(newUserInfo);
                    }).catch((e) => {
                      alert(e.message);
                    })
                    setModal(false);
                  }).catch((e)=>{
                    alert(e.message);
                  })}}>저장</button>
                <button onClick={() => { setModal(false); }}>취소</button>
              </div>
            </div>
          </div>
          :
          null
      }
      <div className="left">
        <img className="profile-image" alt='프로필 사진' src={userInfo.profileUrl}></img>
        <h2>{userInfo.nickname}</h2>
        <div className="intro-msg">{userInfo.introduction}</div>
        <div className="follow-info">
          <p>팔로워</p>
          <p>N명</p>
          <hr />
          <p>팔로잉</p>
          <p>N명</p>
        </div>

        {
          isMine ?
            <div>
              <button onClick={() => { setModal(true); }}>프로필 설정</button>
              <p className="setting" onClick={() => { navigate('/settings'); }}>계정 설정</p>
              <p className="setting" onClick={() => {
                setUser({
                  isLogin: false,
                  id: '',
                  name: '',
                  email: ''
                })
                sessionStorage.removeItem('accessToken');
                navigate('/login')
              }}>로그 아웃</p>
            </div>
            : <button >팔로우하기</button>
        }
      </div>

      <div className="right">
        <div>
          <div className="info-circle"><h3>플로깅 참여 횟수</h3><h1>{counts}회</h1></div>
          <div className="info-circle"><h3>총 플로깅한 거리</h3><h1>{distance}km</h1></div>
        </div>
        <div className="my-plogging">
          <div className="title">
            <h2>Plogging Logs</h2>
            <p onClick={() => { navigate('/myploggings') }}>전체보기</p>
          </div>
          <div className="logs-container">
            {
              logs.length > 0 ?
                logs.map((e, i) => {
                  return <OneLog title={e.title} key={i} setLogModal={setLogModal} imgUrl={e.imgUrl} />;
                })
                : <p>모임에 참여해주세요!</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function OneLog({ setLogModal, title, imgUrl }) {

  return (
    <div onClick={() => {
      setLogModal(true);
    }} className="one-log">
      <img alt="플로깅 사진" src={imgUrl} />
      <p>{title}</p>
    </div>
  )

}


export default MyPage;
