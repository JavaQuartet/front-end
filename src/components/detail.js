import React from "react";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Postcode from "react-daum-postcode";

import "../stylesheet/detail.scss";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);
const { kakao } = window;

function Detail(props) {
    const [map, setMap] = useState(null);
    const [notice, setNotice] = useState([
        "아무개",
        "아무개",
        "아무개",
        "아무개",
        "아무개",
        "아무개",
        "아무개",
        "아무개",
    ]);
    const [placeSetting, setPlaceSetting] = useState(false);
    const [scheduleSetting, setScheduleSetting] = useState(false);
    const [postBtn, setPostBtn] = useState(false);

    //날짜 텍스트 state
    const [startDateInput, setStartDateInput] = useState("");
    const [endDateInput, setEndDateInput] = useState("");
    const [startDateText, setStartDateText] = useState("");
    const [endDateText, setEndDateText] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    //장소 state
    const [isStart, setIsStart] = useState(false);
    const [startPlaceInput, setStartPlaceInput] = useState("");
    const [endPlaceInput, setEndPlaceInput] = useState("");
    const [startPlace, setStartPlace] = useState("서울 강남구 가로수길 5");
    const [endPlace, setEndPlace] = useState("서울 강남구 가로수길 5");

    const [postModalOpen, setPostModalOpen] = useState(false);

    useEffect(() => {
        //지도를 표시할 div
        const container = document.getElementById("map");
        //지도의 중심 좌표 설정
        const options = { center: new kakao.maps.LatLng(37.5212557526595, 127.023032708155) };
        //지도 생성
        const kakaoMap = new kakao.maps.Map(container, options);
        //주소-좌표 변환 객체 생성
        const geocoder = new kakao.maps.services.Geocoder();
        //주소로 좌표 검색
        geocoder.addressSearch(`${startPlace}`, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                });
                marker.setMap(kakaoMap);
                kakaoMap.setCenter(coords);
            }
        });

        setMap(kakaoMap);
    }, [startPlace]);

    return (
        <div
            className="detail-outside"
            onClick={() => {
                props.setModalOpen(false);
                setPlaceSetting(false);
                setScheduleSetting(false);
            }}
        >
            <div
                className="detail-background"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="detail-top">
                    <button
                        onClick={() => {
                            props.setModalOpen(false);
                        }}
                    >
                        X
                    </button>
                    <div className="detail-title">강동PLOW</div>
                    <div className="profile">
                        <span>
                            <img className="profile-icon" src={require("../img/profile.jpg")} />
                        </span>
                        <span>정정정</span>
                        <span>
                            <img className="people-icon" src={require("../img/people.png")} />
                        </span>
                        <span>2/5</span>
                        <span>D-1</span>
                    </div>
                </div>
                <div className="detail-main">
                    <div className="detail-left">
                        <div className="detail-map">
                            <p>위치</p>
                            <div className="detail-map-box">
                                <div id="map" className="map"></div>
                            </div>
                            <div className="detail-text">
                                <div className="detail-map-text">
                                    <p className="title">출발</p>
                                    <p className="content">{startPlace}</p>
                                </div>
                                <div className="detail-map-text sub">
                                    <p className="title">도착</p>
                                    <p className="content">{endPlace}</p>
                                </div>
                            </div>
                            <div className="detail-distance">약 3.5Km</div>
                            <div
                                className="setting"
                                onClick={() => {
                                    setPlaceSetting(!placeSetting);
                                }}
                            >
                                <img src={require("../img/posting.png")} />
                            </div>
                        </div>
                        <div className="detail-schedule">
                            <p>일정</p>
                            <div className="schedule-text">
                                <p className="title">출발</p>
                                <p className="content">{startDateText}</p>
                            </div>
                            <div className="schedule-text">
                                <p className="title">도착</p>
                                <p className="content">{endDateText}</p>
                            </div>
                            <div
                                className="setting"
                                onClick={(e) => {
                                    setScheduleSetting(!scheduleSetting);
                                }}
                            >
                                <img src={require("../img/posting.png")} />
                            </div>
                        </div>
                    </div>
                    <div className="detail-right">
                        <div className="notice">
                            <FontAwesomeIcon icon={faBullhorn} className="icon" />
                            <div className="notice-text">
                                <p>6시에 모이세용</p>
                            </div>
                            <div
                                className="detail-posting-btn"
                                onClick={() => {
                                    setPostBtn(!postBtn);
                                }}
                            >
                                <img src={require("../img/posting.png")} />
                            </div>
                        </div>
                        <div className="user-board">
                            <p className="notice-font">모임</p>
                            <div className="detail-board">
                                {notice.map((res) => {
                                    return (
                                        <div className="detail-post action">
                                            <div className="img-frame">
                                                <img src={require("../img/profile.jpg")} />
                                            </div>
                                            <p className="post-font">{res}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={placeSetting == true ? "settingBox" : "hidden"}>
                        <div className="setting-text-wrapper">
                            <span>출발</span>
                            <input
                                className="setting-input"
                                type="text"
                                value={startPlaceInput}
                                onClick={() => {
                                    setPostModalOpen(true);
                                    setIsStart(true);
                                }}
                            ></input>
                        </div>
                        <div className="setting-text-wrapper">
                            <span>도착</span>
                            <input
                                className="setting-input"
                                type="text"
                                value={endPlaceInput}
                                onClick={() => {
                                    setPostModalOpen(true);
                                    setIsStart(false);
                                }}
                            ></input>
                        </div>
                        <button
                            className="setting-btn"
                            onClick={() => {
                                setPlaceSetting(false);
                                setStartPlace(startPlaceInput);
                                setEndPlace(endPlaceInput);
                            }}
                        >
                            설정하기
                        </button>
                    </div>
                    <div className={scheduleSetting == true ? "settingBox scheduleBox" : "hidden"}>
                        <div className="setting-text-wrapper">
                            <div className="setting-text">출발</div>
                            <DatePicker
                                selected={startDateInput}
                                className="datepicker"
                                onChange={(date) => {
                                    let month = date.getMonth() + 1;
                                    let start = `${date.getFullYear()}년 ${month}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
                                    setStartDateInput(date);
                                    setStartDate(start);
                                }}
                                dateFormat="yyyy년 MM월 dd일 HH시 mm분"
                                dateFormetCalendar="yyyy년 MM월"
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervalse={30}
                                timeCaption="출발"
                                placeholderText="출발 시각"
                                locale="ko"
                            />
                        </div>
                        <div className="setting-text-wrapper">
                            <div className="setting-text">도착</div>
                            <DatePicker
                                selected={endDateInput}
                                className="datepicker"
                                onChange={(date) => {
                                    let month = date.getMonth() + 1;
                                    let end = `${date.getFullYear()}년 ${month}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
                                    setEndDateInput(date);
                                    setEndDate(end);
                                }}
                                dateFormat="yyyy년 MM월 dd일 HH시 mm분"
                                dateFormetCalendar="yyyy년 MM월"
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervalse={30}
                                timeCaption="도착"
                                placeholderText="도착 시각"
                                locale="ko"
                            />
                        </div>
                        <button
                            className="setting-btn"
                            onClick={() => {
                                setScheduleSetting(false);
                                setStartDateText(startDate);
                                setEndDateText(endDate);
                            }}
                        >
                            설정하기
                        </button>
                    </div>
                    <div className={postBtn == true ? "postBox" : "hidden"}>
                        <button
                            className="exit-btn"
                            onClick={() => {
                                setPostBtn(false);
                            }}
                        >
                            X
                        </button>
                        <form className="postWriting">
                            <div className="posting-content">
                                <span>내용</span>
                                <input type="textarea" />
                                <button
                                    onClick={() => {
                                        setPostBtn(false);
                                    }}
                                >
                                    확인
                                </button>
                            </div>
                        </form>
                    </div>
                    <button className="detail-btn">나가기</button>
                </div>
            </div>
            {postModalOpen == true ? (
                <div
                    className="postcode-background"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <p>주소 검색</p>
                    <Postcode
                        className="postmodal"
                        onComplete={(data) => {
                            console.log(data);
                            setPostModalOpen(false);

                            if (isStart === true) {
                                setStartPlaceInput(data.address);
                            } else {
                                setEndPlaceInput(data.address);
                            }
                        }}
                        autoClose
                    />
                </div>
            ) : null}
        </div>
    );
}

export default Detail;
