import React from "react";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
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

    //datePicker 텍스트 설정 state
    const [inputStartDate, setInputStartDate] = useState();
    const [inputEndDate, setInputEndDate] = useState();

    //날짜 텍스트 state
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const container = document.getElementById("map");
        const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap);
    }, []);
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
                                    <p className="content">동대문역사문화공원역</p>
                                </div>
                                <div className="detail-map-text sub">
                                    <p className="title">도착</p>
                                    <p className="content">종로3가역</p>
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
                                <p className="content">{startDate}</p>
                            </div>
                            <div className="schedule-text">
                                <p className="title">도착</p>
                                <p className="content">{endDate}</p>
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
                            <input className="setting-input"></input>
                        </div>
                        <div className="setting-text-wrapper">
                            <span>도착</span>
                            <input className="setting-input"></input>
                        </div>
                        <button
                            className="setting-btn"
                            onClick={() => {
                                setPlaceSetting(false);
                            }}
                        >
                            설정하기
                        </button>
                    </div>
                    <div className={scheduleSetting == true ? "settingBox scheduleBox" : "hidden"}>
                        <div className="setting-text-wrapper">
                            <div className="setting-text">출발</div>
                            <DatePicker
                                selected={inputStartDate}
                                className="datepicker"
                                onChange={(date) => {
                                    let month = date.getMonth() + 1;
                                    setStartDate(
                                        `${date.getFullYear()}년 ${month}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`
                                    );
                                    setInputStartDate(date);
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
                                selected={inputEndDate}
                                className="datepicker"
                                onChange={(date) => {
                                    let month = date.getMonth() + 1;
                                    setEndDate(
                                        `${date.getFullYear()}년 ${month}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`
                                    );
                                    setInputEndDate(date);
                                    console.log(month);
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
                                setPlaceSetting(false);
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
        </div>
    );
}

export default Detail;
