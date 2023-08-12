import React, { useState } from "react";
import '../stylesheet/myPloggings.scss'
import Detail from "../components/detail.js"



function MyPloggings() {

    let [logModal, setLogModal] = useState(false);
    return (
        <div className="my-ploggings">

      {
        logModal ? <Detail modalOpen={logModal} setModalOpen={setLogModal} /> : null
      }
                <h1>Plogging Logs</h1>
                <div className="types">
                <button>완료한 플로깅</button>
                <button>신청한 플로깅</button>
                <button>내가 만든 플로깅</button>
                </div>
            <div className="items-container">
                <OneItem setLogModal={setLogModal}/>
                <OneItem setLogModal={setLogModal}/>
                <OneItem setLogModal={setLogModal}/>
                <OneItem setLogModal={setLogModal}/>
                <OneItem setLogModal={setLogModal}/>
                <OneItem setLogModal={setLogModal}/>
                <OneItem setLogModal={setLogModal}/>
                <OneItem setLogModal={setLogModal}/>
                <OneItem setLogModal={setLogModal}/>
            </div>
        </div>
    )
}

function OneItem({setLogModal}){

    return(
        <div onClick={()=>{setLogModal(true);}} className="item">
            <img width="100px" height="100px" src="https://img.freepik.com/free-photo/recycle-concept-with-woman-collecting-trash_23-2147825501.jpg?size=626&ext=jpg&ga=GA1.2.1645765076.1690271831&semt=sph" alt="플로깅 사진" />
            <p>어서오세요 안국역 근처입니다 ~~</p>
       </div>
    )
}

export default MyPloggings;