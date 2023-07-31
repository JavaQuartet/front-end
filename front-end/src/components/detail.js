import React from "react";
import "../stylesheet/detail.scss";
import { useEffect, useState } from "react";

const { kakao } = window;

function Detail(props) {
    const [map, setMap] = useState(null);
    const [notice, setNotice] = useState([
        "6시까지 모이세요 다들~",
        "7시로 시간 변경됐습니다.",
        "최종: 9시!!!",
        "아아아",
        "아아아",
        "아아아",
        "아아아",
        "아아아",
    ]);
    const [placeSetting, setPlaceSetting] = useState(false);
    const [scheduleSetting, setScheduleSetting] = useState(false);
    const [postBtn, setPostBtn] = useState(false);

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
                    <div>강동PLOW</div>
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
                                <img src={require("../img/setting.png")} />
                            </div>
                        </div>
                        <div className="detail-schedule">
                            <p>일정</p>
                            <div className="schedule-text">
                                <p className="title">출발</p>
                                <p className="content">07.15</p>
                                <p className="content">02:47</p>
                            </div>
                            <div className="schedule-text">
                                <p className="title">도착</p>
                                <p className="content">07.15</p>
                                <p className="content">19:00</p>
                            </div>
                            <div
                                className="setting"
                                onClick={(e) => {
                                    setScheduleSetting(!scheduleSetting);
                                }}
                            >
                                <img src={require("../img/setting.png")} />
                            </div>
                        </div>
                    </div>
                    <div className="detail-right">
                        <p className="notice-font">공지</p>
                        <div className="detail-board">
                            <div className="detail-post important">
                                <div className="img-frame">
                                    <img src={require("../img/profile.jpg")} />
                                </div>
                                <p className="post-font">{notice[0]}</p>
                            </div>
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
                        <div
                            className="detail-posting-btn"
                            onClick={() => {
                                setPostBtn(!postBtn);
                            }}
                        >
                            <img src={require("../img/posting.png")} />
                        </div>
                    </div>
                    <div className={placeSetting == true ? "settingBox" : "hidden"}>
                        <form>
                            <div>
                                <span>출발</span>
                                <input></input>
                            </div>
                            <div>
                                <span>도착</span>
                                <input></input>
                            </div>
                            <button
                                onClick={() => {
                                    setPlaceSetting(false);
                                }}
                            >
                                설정하기
                            </button>
                        </form>
                    </div>
                    <div className={scheduleSetting == true ? "settingBox scheduleBox" : "hidden"}>
                        <form>
                            <div>
                                <span>출발</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span>도착</span>
                                <input type="text" />
                            </div>
                            <button
                                onClick={() => {
                                    setPlaceSetting(false);
                                }}
                            >
                                설정하기
                            </button>
                        </form>
                    </div>
                    <div className={postBtn == true ? "postBox" : "hidden"}>
                        <div
                            className="exit-btn"
                            onClick={() => {
                                setPostBtn(false);
                            }}
                        >
                            X
                        </div>
                        <form className="postWriting">
                            <div className="notice-div">
                                <input type="checkbox" id="cb" />
                                <label for="cb"></label>
                                <span className="notice-span">공지</span>
                            </div>
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
