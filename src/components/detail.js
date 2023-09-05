import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Postcode from "react-daum-postcode";
import axios from "axios";

import "../stylesheet/detail.scss";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);
const { kakao } = window;

function Detail(props) {
    const navigate = useNavigate();

    const [map, setMap] = useState(null);
    const [placeSetting, setPlaceSetting] = useState(false);
    const [scheduleSetting, setScheduleSetting] = useState(false);
    const [postBtn, setPostBtn] = useState(false);

    //참여 여부 state
    const [isJoin, setIsJoin] = useState(1);

    //제목
    const [title, setTitle] = useState("");

    //공지
    const [notice, setNotice] = useState("");

    //모임 만든 사람
    const [makerName, setMakerName] = useState("");
    //참여중인 사용자
    const [participant, setParticipant] = useState([]);

    //모임 인원
    const [maxMember, setMaxMember] = useState(0);
    const [currentMember, setCurrentMember] = useState(0);

    //D-Day
    const [dDay, setDDay] = useState("");
    const [dDayStr, setDDayStr] = useState("");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [date, setDate] = useState(0);

    //날짜 텍스트
    const [startDateInput, setStartDateInput] = useState("");
    const [endDateInput, setEndDateInput] = useState("");
    const [startDateText, setStartDateText] = useState("");
    const [endDateText, setEndDateText] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    //장소
    const [isStart, setIsStart] = useState(false);
    const [startPlaceInput, setStartPlaceInput] = useState("");
    const [endPlaceInput, setEndPlaceInput] = useState("");
    const [startPlace, setStartPlace] = useState("서울 강남구 가로수길 5");
    const [endPlace, setEndPlace] = useState("서울 노원구 광운로15길 5");
    const [startCoords, setStartCoords] = useState({ y: 0, x: 0 });
    const [endCoords, setEndCoords] = useState({ y: 0, x: 0 });

    //거리
    //let [distance, setDistance] = useState(0);
    //modal 핸들러
    const [postModalOpen, setPostModalOpen] = useState(false);
    let distance = 0;
    const [distanceText, setDistanceText] = useState(0);
    useEffect(() => {
        getMaker();
        getClass();
    }, []);
    useEffect(() => {
        showMap();
    }, [startPlace]);

    useEffect(() => {
        console.log("useEffect");
        setCoords(startPlaceInput, endPlaceInput);
    }, [startPlaceInput, endPlaceInput]);

    //모임 만든사람 정보
    const getMaker = () => {
        axios
            .get(`http://43.200.172.177:8080/users/${props.maker}/profile`, {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                },
                params: {
                    id: props.maker,
                },
            })
            .then((result) => {
                if (result.status === 200) {
                    console.log(result);
                    setMakerName(result.data.data.nickname);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //거리 계산 함수
    const getDistance = (lat1, lng1, lat2, lng2) => {
        console.log(startPlaceInput);
        console.log(endPlaceInput);
        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lng2 - lng1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = Math.round(R * c * 100) / 100; // Distance in km

        //setDistance(d);
        distance = d;
        console.log(d);
        return d;
    };

    //주소로 좌표 얻어오기
    const setCoords = (start, end) => {
        console.log("setcoords");
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(`${start}`, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                setStartCoords({ y: result[0].y, x: result[0].x });
            }
        });
        geocoder.addressSearch(`${end}`, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                setEndCoords({ y: result[0].y, x: result[0].x });
            }
        });
        console.log(startCoords.y + " " + startCoords.x + " " + endCoords.y + " " + endCoords.x);
        getDistance(startCoords.y, startCoords.x, endCoords.y, endCoords.x);
    };

    //위치 수정
    const ModifyPlace = () => {
        console.log("modify");
        console.log(distance);
        setDistanceText(distance.toString());
        axios
            .patch(
                `http://43.200.172.177:8080/class/${props.classNo}`,
                {
                    classId: props.classNo,
                    startRegion: startPlaceInput,
                    end_region: endPlaceInput,
                    distance: distance,
                },
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((result) => {
                if (result.status === 200) {
                    console.log("수정완료");
                    console.log(result);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //일정 수정
    const ModifySchedule = () => {
        axios
            .patch(
                `http://43.200.172.177:8080/class/${props.classNo}`,
                {
                    classId: props.classNo,
                    start_date: startDate,
                    end_date: endDate,
                    start_year: year,
                    start_month: month,
                    start_day: date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((result) => {
                if (result.status === 200) {
                    console.log("수정완료");
                    console.log(result);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //공지 수정
    const ModifyNotice = () => {
        console.log(notice);
        axios
            .patch(
                `http://43.200.172.177:8080/class/notice/${props.classNo}`,
                {
                    classId: props.classNo,
                    notice: notice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((result) => {
                if (result.status === 200) {
                    console.log("수정완료");
                    console.log(result);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    //모임 참여
    const joinClass = () => {
        axios
            .post(
                `http://43.200.172.177:8080/class/join/${props.classNo}`,
                {
                    classId: props.classNo,
                },
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((result) => {
                if (result.status === 200) {
                    alert("모임 참여 완료!");
                    navigate("/mypage");
                    console.log(result);
                }
            })
            .catch((error) => {
                if (error.status === 401) {
                    navigate("/login");
                } else if (error.status === 400) {
                    alert("이미 참여한 모임입니다.");
                }
            });
    };

    //모임 나가기
    const leaveClass = () => {
        axios
            .post(
                `http://43.200.172.177:8080/class/unjoin/${props.classNo}`,
                {
                    classId: props.classNo,
                },
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((result) => {
                if (result.status === 200) {
                    alert("모임 나가기 완료!");
                    window.location.replace("/");
                    console.log(result);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //모임 종료하기
    const endClass = () => {
        axios
            .patch(
                `http://43.200.172.177:8080/class/${props.classNo}`,
                {
                    data: {
                        classId: props.classNo,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((result) => {
                if (result.status === 200) {
                    alert("모임 종료 완료!");
                    navigate("/community");
                    console.log(result);
                }
            })
            .catch((error) => {
                if (error.status === 400) {
                    alert("이미 종료된 모임입니다.");
                }
            });
    };

    //모임 삭제
    const deleteClass = () => {
        axios
            .delete(
                `http://43.200.172.177:8080/class/${props.classNo}`,
                {
                    data: {
                        classId: props.classNo,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                    },
                }
            )
            .then((result) => {
                if (result.status === 200) {
                    alert("모임 삭제 완료!");
                    window.location.replace("/");
                    console.log(result);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    //D-Day 계산 함수
    const getDDayStr = (result) => {
        let str;
        if (result < 0) {
            str = result.toString();
        } else {
            str = "+" + result.toString();
        }
        return str;
    };
    const getDDay = (year, month, date) => {
        let today = new Date();
        let day = new Date(year, month - 1, date);
        let gap = today.getTime() - day.getTime();
        let result = Math.ceil(gap / (1000 * 60 * 60 * 24)) - 1;

        console.log(result);
        return result;
    };

    const setDetail = (result) => {
        setTitle(result.data.data.title);
        setCurrentMember(result.data.data.member_current);
        setMaxMember(result.data.data.member_max);
        setStartDateText(result.data.data.start_date);
        setEndDateText(result.data.data.end_date);
        setStartPlace(result.data.data.startRegion);
        setEndPlace(result.data.data.end_region);
        setNotice(result.data.data.notice);
        setParticipant(result.data.data.classParticipantsEntityList);
        setYear(result.data.data.start_year);
        setMonth(result.data.data.start_month);
        setDate(result.data.data.start_day);
        setDDayStr(
            getDDayStr(
                getDDay(
                    result.data.data.start_year,
                    result.data.data.start_month,
                    result.data.data.start_day
                )
            )
        );
        setDDay(
            getDDay(
                result.data.data.start_year,
                result.data.data.start_month,
                result.data.data.start_day
            )
        );
        //setDistance(result.data.data.distance);
        setDistanceText(result.data.data.distance);
    };
    //상세 페이지 정보 요청
    const getClass = async () => {
        const detail = await axios
            .get(`http://43.200.172.177:8080/class/${props.classNo}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                },
            })
            .then((result) => {
                //참여한 모임
                console.log(result);
                if (result.status === 200) {
                    console.log(result);
                    setIsJoin(1);
                    setDetail(result);
                }
                //참여안한 모임
                else if (result.status === 201) {
                    console.log(result);
                    setIsJoin(0);
                    setDetail(result);
                }
                //내가 만든 모임
                else if (result.status === 202) {
                    console.log(result);
                    setIsJoin(2);
                    setDetail(result);
                }
            })
            .catch((error) => {
                if (error.status === 401) {
                    navigate("/login");
                }
            });
    };

    //지도 표시
    const showMap = () => {
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
    };

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
                    <div className="detail-title">{title}</div>
                    <div className="profile">
                        <span>
                            {/*<img className="profile-icon" src={require("../img/profile.jpg")} />*/}
                            Maker:
                        </span>
                        <span>{makerName}</span>
                        <span>
                            <img className="people-icon" src={require("../img/people.png")} />
                        </span>
                        <span>
                            {currentMember}/{maxMember}
                        </span>
                        <span>D{dDayStr}</span>
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
                            <div className="detail-distance">{distanceText}Km</div>
                            <div
                                className="setting"
                                onClick={() => {
                                    setPlaceSetting(!placeSetting);
                                }}
                            >
                                {isJoin === 2 ? <img src={require("../img/posting.png")} /> : null}
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
                                {isJoin === 2 ? <img src={require("../img/posting.png")} /> : null}
                            </div>
                        </div>
                    </div>
                    <div className="detail-right">
                        <div className="notice">
                            <FontAwesomeIcon icon={faBullhorn} className="icon" />
                            <div className="notice-text">
                                <p>{notice}</p>
                            </div>
                            <div
                                className="detail-posting-btn"
                                onClick={() => {
                                    setPostBtn(!postBtn);
                                }}
                            >
                                {isJoin === 2 ? <img src={require("../img/posting.png")} /> : null}
                            </div>
                        </div>
                        <div className="user-board">
                            <p className="notice-font">멤버</p>
                            <div className="detail-board">
                                {participant.map((res, i) => {
                                    return (
                                        <div className="detail-post action">
                                            {/*
                                                <div className="img-frame">
                                                <img src={require("../img/profile.jpg")} />
                                                </div>
                                            */}
                                            <p className="post-font">
                                                {participant[i].user_nickname}
                                            </p>
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
                                setCoords(startPlaceInput, endPlaceInput);
                                ModifyPlace();
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
                                    setYear(date.getFullYear());
                                    setMonth(month);
                                    setDate(date.getDate());
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
                                ModifySchedule();
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
                                <input
                                    type="textarea"
                                    onChange={(e) => {
                                        setNotice(e.target.value);
                                    }}
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPostBtn(false);
                                        ModifyNotice();
                                    }}
                                >
                                    확인
                                </button>
                            </div>
                        </form>
                    </div>
                    {isJoin === 0 ? (
                        <button
                            className="detail-btn"
                            onClick={() => {
                                leaveClass();
                                window.location.replace("/");
                            }}
                        >
                            모임 나가기
                        </button>
                    ) : null}
                    {isJoin === 1 ? (
                        <button className="detail-btn" onClick={joinClass}>
                            참여하기
                        </button>
                    ) : null}
                    {isJoin === 2 ? (
                        <button className="detail-btn" onClick={deleteClass}>
                            모임 삭제하기
                        </button>
                    ) : null}
                    {isJoin === 2 && dDay > 0 ? (
                        <button className="finish-btn" onClick={endClass}>
                            모임 종료하기
                        </button>
                    ) : null}
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
                            let address = "";
                            if (data.autoJibunAddress === "") {
                                address = data.jibunAddress;
                            } else {
                                address = data.autoJibunAddress;
                            }
                            if (isStart === true) {
                                setStartPlaceInput(address);
                                console.log(startPlaceInput);
                            } else {
                                setEndPlaceInput(address);
                                console.log(endPlaceInput);
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
