import React, { useEffect, useState } from "react";
import '../stylesheet/myPloggings.scss'
import Detail from "../components/detail.js"
import axios from "axios";



function MyPloggings() {

    let [type, setType] = useState(1);

    let [logs, setLogs] = useState([]);

    let accessToken = sessionStorage.getItem('accessToken');

    const fetchURL = "http://3.39.75.222:8080";

    let [classNum, setClassNum] = useState(0);
    

    useEffect(() => {
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
      
    }, [])

    useEffect(() => {
        axios.get(fetchURL + `/class/me?category=${type}`, {
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
    }, [type])

    let [logModal, setLogModal] = useState(false);
    return (
        <div className="my-ploggings">

            {
        logModal ? <Detail modalOpen={logModal} setModalOpen={setLogModal} token={accessToken} classNo={classNum}/> : null
            }
            <h1 onClick={() => { setType(0) }}>Plogging Logs</h1>
            <div className="types">
                <button onClick={() => { setType(3) }}>내가 만든 플로깅</button>
                <button onClick={() => { setType(2) }}>신청한 플로깅</button>
                <button onClick={() => { setType(1) }}>완료한 플로깅</button>
            </div>
            <div className="items-container">
                {
                    logs.map((e, i) => {
                        return <OneItem element={e} key={i} setLogModal={setLogModal} setClassNum={setClassNum}/>
                    })
                }
            </div>
        </div>
    )
}

function OneItem({ setLogModal, element, setClassNum }) {

    return (
        <div onClick={() => { setClassNum(element.class_Id); setLogModal(true); }} className="item">
            <img width="100px" height="100px" src={element.imgUrl} alt="플로깅 사진" />
            <p>{element.title}</p>
        </div>
    )
}

export default MyPloggings;