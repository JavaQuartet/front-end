import React, { useState, useRef, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Postcode from "react-daum-postcode";
import axios from "axios";

//스타일시트
import "../stylesheet/create.scss";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);
const { kakao } = window;
function Create(props) {
    const BASE_URL = "http://3.39.75.222:8080";

    const [postModalOpen, setPostModalOpen] = useState(false);

    const [title, setTitle] = useState("");

    const [startDateInput, setStartDateInput] = useState(null);
    const [endDateInput, setEndDateInput] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [startYear, setStartYear] = useState(0);
    const [startMonth, setStartMonth] = useState(0);
    const [startDay, setStartDay] = useState(0);

    const [isStart, setIsStart] = useState(true);
    const [startPlace, setStartPlace] = useState("");
    const [endPlace, setEndPlace] = useState("");

    const [member, setMember] = useState(0);
    const [description, setDescription] = useState("");

    let distance = 0;
    const [startCoords, setStartCoords] = useState({ y: 0, x: 0 });
    const [endCoords, setEndCoords] = useState({ y: 0, x: 0 });

    useEffect(() => {
        setCoords(startPlace, endPlace);
    }, [startPlace, endPlace]);
    //거리 계산 함수
    const getDistance = (lat1, lng1, lat2, lng2) => {
        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }
        var R = 6371;
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lng2 - lng1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = Math.round((R * c * 100) / 100);

        distance = d;
        return d;
    };

    //주소로 좌표 얻어오기
    const setCoords = (start, end) => {
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
        getDistance(startCoords.y, startCoords.x, endCoords.y, endCoords.x);
    };
    const postClass = () => {
        console.log("title: " + title + " startRegion: " + startPlace + "endRegion: " + endPlace);
        axios
            .post(
                `${BASE_URL}/class`,
                {
                    title: title,
                    member_max: member,
                    startRegion: startPlace,
                    end_region: endPlace,
                    description: description,
                    start_date: startDate,
                    end_date: endDate,
                    start_year: startYear,
                    start_month: startMonth,
                    start_day: startDay,
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
                if (result.status === 201) {
                    console.log(result);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div
            className="make-outside"
            onClick={() => {
                props.setCreateOpen(false);
            }}
        >
            <div
                className="make-background"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="make-title">
                    <p>plowithme</p>
                </div>
                <div className="make-info">
                    <div className="make-text">
                        <span className="title">이름</span>
                        <input
                            type="text"
                            maxLength="8"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className="make-text">
                        <span className="title">출발</span>
                        <DatePicker
                            className="datepicker"
                            selected={startDateInput}
                            onChange={(date) => {
                                let month = date.getMonth() + 1;
                                let start = `${date.getFullYear()}년 ${month}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
                                setStartDateInput(date);
                                setStartDate(start);

                                setStartYear(date.getFullYear());
                                setStartMonth(date.getMonth() + 1);
                                setStartDay(date.getDate());
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
                    <div className="make-text">
                        <span className="title">도착</span>
                        <DatePicker
                            className="datepicker"
                            selected={endDateInput}
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
                    <div className="make-text">
                        <span className="title">장소</span>
                        <span className="span-start">출발</span>
                        <input
                            type="text"
                            className="place"
                            maxLength="30"
                            onClick={() => {
                                setIsStart(true);
                                setPostModalOpen(true);
                            }}
                            value={startPlace}
                        ></input>
                    </div>
                    <div className="make-text">
                        <span className="span-start">도착</span>
                        <input
                            type="text"
                            className="input-place place"
                            maxLength="30"
                            onClick={() => {
                                setIsStart(false);
                                setPostModalOpen(true);
                            }}
                            value={endPlace}
                        ></input>
                    </div>
                    <div className="make-text">
                        <span className="title">인원</span>
                        <input
                            type="text"
                            maxLength="8"
                            onChange={(e) => {
                                setMember(e.target.value);
                            }}
                        ></input>
                    </div>
                </div>
                <div className="make-content">
                    <span>소개</span>
                    <input
                        type="textarea"
                        maxLength="20"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    ></input>
                </div>
                <button
                    onClick={() => {
                        props.setCreateOpen(false);
                        setCoords(startPlace, endPlace);
                        postClass();
                    }}
                >
                    모임 만들기
                </button>
            </div>

            {postModalOpen == true ? (
                <div className="postcode-background">
                    <p>주소 검색</p>
                    <Postcode
                        className="postmodal"
                        onComplete={(data) => {
                            setPostModalOpen(false);
                            let address = "";

                            if (data.autoJibunAddress === "") {
                                address = data.jibunAddress;
                            } else {
                                address = data.autoJibunAddress;
                            }
                            if (isStart === true) {
                                setStartPlace(address);
                            } else {
                                setEndPlace(address);
                            }
                        }}
                        autoClose
                    />
                </div>
            ) : null}
        </div>
    );
}

export default Create;
