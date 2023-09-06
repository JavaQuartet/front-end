import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import DaumPostcode from 'react-daum-postcode';
import axios from "axios";


import "../stylesheet/signup.scss";

function SignUp() {

    let [name, setName] = useState('');
    let [pw, setPw] = useState('');
    let [email, setEmail] = useState('');
    let [pw2, setPw2] = useState('');

    const [startDate, setStartDate] = useState(new Date());
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

    const fetchURL = 'http://43.200.172.177:8080';


    return (
        <div className="signup-background">
            <p>Plowithme</p>
            <div className="signup-main">
                <input onChange={(e)=>{
                    setName(e.target.value);
                }} type="text" placeholder="이름" id="name" />
                <DatePicker
                    wrapperClassName="datepicker"
                    dateFormat="yyyy/MM/dd"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                <input type="button" onClick={handle.clickButton} defaultValue={region.address} id="local" />
                {openPostcode &&
                    <div className="daumpost">
                        <DaumPostcode
                            onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                        />
                    </div>
                }
                <input onChange={(e)=>{
                    setEmail(e.target.value);
                }} placeholder="이메일" id="id" />
                <input onChange={(e)=>{
                    setPw(e.target.value);
                }} type="password" placeholder="패스워드" id="password" />
                <input onChange={(e)=>{
                    setPw2(e.target.value);
                }} type="password" placeholder="패스워드 확인" id="password" />
                <button onClick={() => {
                    if(pw !== pw2){
                        alert('비밀번호를 확인 해주세요!');
                    }
                    else{
                        let newUser = {
                            name: name,
                            birth: startDate.toDateString(),
                            password: pw,
                            email: email,
                            region: region
                        }
                        console.log(region);
                        axios.post(fetchURL + '/auth/sign-up', newUser)
                        .then((result)=>{
                            alert('회원가입 되었습니다. 새롭게 로그인해주세요!')
                            navigate('/login');
                        })
                        .catch((e)=>{
                            alert(e.message);
                        })
                    }
                }} className="login" type="button">
                    회원가입
                </button>
            </div>
        </div>
    );
}
export default SignUp;
