import React, { useEffect, useState } from "react";
import '../stylesheet/myPloggings.scss'
import Detail from "../components/detail.js"
import axios from "axios";



function MyPloggings() {

    let [type, setType] = useState(1);

    let [logs, setLogs] = useState([]);

    let accessToken = sessionStorage.getItem('accessToken');

    const fetchURL = 'http://43.200.172.177:8080';
    

    useEffect(() => {
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
    }, [])

    useEffect(() => {
        axios.get(fetchURL + `/class/me?category=${type}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((result) => {
            let tmp = result.data.data;
            setLogs(tmp);
        }).catch((e) => {
            alert(e.message);
        })
    }, [type])

    let [logModal, setLogModal] = useState(false);
    return (
        <div className="my-ploggings">

            {
                logModal ? <Detail modalOpen={logModal} setModalOpen={setLogModal} /> : null
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
                        return <OneItem element={e} key={i} setLogModal={setLogModal} />
                    })
                }
            </div>
        </div>
    )
}

function OneItem({ setLogModal, element }) {

    return (
        <div onClick={() => { setLogModal(true); }} className="item">
            <img width="100px" height="100px" src="https://img.freepik.com/free-photo/recycle-concept-with-woman-collecting-trash_23-2147825501.jpg?size=626&ext=jpg&ga=GA1.2.1645765076.1690271831&semt=sph" alt="플로깅 사진" />
            <p>{element.title}</p>
        </div>
    )
}

export default MyPloggings;