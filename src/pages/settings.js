import DaumPostcode from 'react-daum-postcode';
import React from "react";
import { useState } from 'react';
import "../stylesheet/settings.scss";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Settings({ user, setUser }) {
    const fetchURL = 'http://43.200.172.177:8080';

    const [openPostcode, setOpenPostcode] = useState(false);
    let [region, setRegion] = useState({ address: '주소' });

    let navigate = useNavigate();

    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },
        // 주소 선택 이벤트
        selectAddress: (data) => {
            setRegion({
                depth_1: data.sido,
                depth_2: data.sigungu,
                depth_3: data.bname,
                address: data.jibunAddress
            })
            setOpenPostcode(false);
        }
    }

    return (
        <div className="settings">
            <div className="grid-container">
                <h2>계정 설정</h2>
                <div />
                <h4>이름</h4><input type="text" value={user.name} disabled/>
                <h4>이메일</h4><input type="email" value={user.email} disabled/>
                <h4>비밀번호</h4><input id="pw" type="password" />
                <h4>지역</h4><input type="text" onClick={handle.clickButton} value={region.address} id="local" />
                {openPostcode &&
                    <div className="daumpost">
                        <DaumPostcode
                            onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                        />
                    </div>
                }
                <div />
                <div className="buttons">
                    <button onClick={() => {
                        let accessToken = sessionStorage.getItem('accessToken');
                        let newData = {
                            password: document.getElementById('pw').value,
                            region: region
                        }
                        axios.patch(fetchURL + `/users/${user.id}`, newData, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }})
                        .then((result)=>{
                            navigate('/mypage');
                        }).catch((e)=>{
                            alert(e.message);
                        })
                    }}>저장</button>
                    <button onClick={() => { navigate('/mypage'); }}>취소</button>
                </div>
            </div>
        </div>
    )
}


export default Settings;