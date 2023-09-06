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
      setLogs(tmp);
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
              <img className="profile-image" alt='프로필 사진' src="https://slp-statics.astockcdn.net/static_assets/staging/23spring/kr/home/curated-collections/card-1.jpg?width=580&format=webp"></img>
              <input className="nickname" value='닉네임' />
              <input className="intro-msg" value="자기소개글(상태메시지)" />
              <div className="buttons">
                <button onClick={() => { setModal(false); }}>저장</button>
                <button onClick={() => { setModal(false); }}>취소</button>
              </div>
            </div>
          </div>
          :
          null
      }
      <div className="left">
        <img className="profile-image" alt='프로필 사진' src={userInfo.profileUrl}></img>
        <h2>{user.name}</h2>
        <div className="intro-msg">{userInfo.introduction}</div>
        <div className="follow-info">
          <p>팔로워</p>
          <p>N명</p>
          <hr />
          <p>팔로잉</p>
          <p>N명</p>
        </div>
        <button >팔로우하기</button>
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
                  return <OneLog title={e.title} key={i} setLogModal={setLogModal} />;
                })
                : <p>모임에 참여해주세요!</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function OneLog({ setLogModal, title }) {
  return (
    <div onClick={() => {
      setLogModal(true);
    }} className="one-log">
      <img alt="플로깅 사진" src="https://img.freepik.com/free-photo/recycle-concept-with-woman-collecting-trash_23-2147825501.jpg?size=626&ext=jpg&ga=GA1.2.1645765076.1690271831&semt=sph" />
      <p>{title}</p>
    </div>
  )

}


export default MyPage;
