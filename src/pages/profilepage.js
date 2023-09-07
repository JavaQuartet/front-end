import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Detail from '../components/detail.js'
import axios from "axios";
import "../stylesheet/profilepage.scss"

function MyPage({ user, setUser }) {

  let navigate = useNavigate();

  let {id} = useParams();

  let [logModal, setLogModal] = useState(false); //Plogging log 모달
  let [msgModal, setMsgModal] = useState(false); //쪽지 쓰는 모달 창



  let fetchURL = 'http://3.39.75.222:8080';


  let [userInfo, setUserInfo] = useState({
    nickname: '',
    profileUrl: '',
    introduction: ''
  })

  let [counts, setCounts] = useState(0);
  let [distance, setDistance] = useState(0);
  let [logs, setLogs] = useState([])

  let accessToken = sessionStorage.getItem('accessToken');

  let [classNum, setClassNum] = useState(0);


  useEffect(() => {

    if(Number(id) === Number(user.id)){
      navigate('/mypage');
    }

    //유저 프로필 조회
    axios.get(fetchURL + `/users/${id}/profile`, {
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
      console.log(newUserInfo);
    }).catch((e) => {
      alert(e.message);
    })

    //모임 횟수 조회
    axios.get(fetchURL + `/users/${id}/class-count`, {
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
    axios.get(fetchURL + `/users/${id}/class-distance`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((result) => {
      let tmp = result.data.data;
      setDistance(tmp);
    }).catch((e) => {
      alert(e.message);
    })

    //유저 모임 조회
    axios.get(fetchURL + `/users/${id}/classes?category=0`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((result) => {
      let tmp = result.data.data;
      let tmpArr;
      axios.get("https://picsum.photos/v2/list?page=2&limit=100")
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

  let [maker, setMaker] = useState(0);

  return (
    <div className="profilepage">
      {
        logModal ? <Detail modalOpen={logModal} setModalOpen={setLogModal} token={accessToken} classNo={classNum} maker={maker}/> : null
      }

      <div className="left">
        <img className="profile-image" alt='프로필 사진' src={userInfo.profileUrl}></img>
        <h2>{userInfo.nickname}</h2>
        <div className="intro-msg">{userInfo.introduction}</div>
        {/* <div className="follow-info">
          <p>팔로워</p>
          <p>N명</p>
          <hr />
          <p>팔로잉</p>
          <p>N명</p>
        </div> */}
        <button onClick={() => {
          setMsgModal(true);
        }} >쪽지보내기</button>
        {
          msgModal && <MsgModal accessToken={accessToken} userId={id} fetchURL={fetchURL} setMsgModal={setMsgModal}/>
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
          </div>
          <div className="logs-container">
            {
              logs.length > 0 ?
                logs.map((e, i) => {
                  return <OneLog setClassNum={setClassNum} setMaker={setMaker} maker={e.maker_id} classId={e.class_Id} title={e.title} key={i} setLogModal={setLogModal} imgUrl={e.imgUrl}/>;
                })
                : <p>아직 참여한 모임이 없습니다!</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function OneLog({ setLogModal, title, imgUrl, classId, setClassNum, setMaker, maker }) {
  return (
    <div onClick={() => {
      setMaker(maker);
      setClassNum(classId);
      setLogModal(true);
    }} className="one-log">
      <img alt="플로깅 사진" src={imgUrl}/>
      <p>{title}</p>
    </div>
  )

}

function MsgModal({ setMsgModal, fetchURL, userId, accessToken }) {
  return (
    <div className="modal">
    <div className="msg-modal">
      <textarea id="content" placeholder="상대방에게 보낼 메시지를 작성하세요!" />
      <div className="buttons">
        <button onClick={()=>{ 
          let newData = {
              content: document.getElementById('content').value,
              receiverId: userId
            }
          axios.post(fetchURL + '/messages', newData, {
            headers: {
            Authorization: `Bearer ${accessToken}`
          }}).then((result)=>{
            alert('쪽지 보내기 성공!');
          }).catch((e)=>{
            alert(e.message);
          })
          setMsgModal(false);

          
         }}>전송</button>
        <button style={{"backgroundColor":"rgb(95,99,104)"}} onClick={() => { setMsgModal(false); }}>취소</button>
      </div>
    </div>
    </div>
  )
}


export default MyPage;
