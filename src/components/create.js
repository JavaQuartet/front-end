import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import "../stylesheet/create.scss";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);
function Create(props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
                <div className="make-image">
                    <img src={require("../img/detail_example.jpg")} className="club-img" />
                    <img src={require("../img/setting.png")} className="setting-img" />
                </div>
                <div className="make-info">
                    <div className="make-text">
                        <span className="title">이름</span>
                        <input type="text" maxLength="8"></input>
                    </div>
                    <div className="make-text">
                        <span className="title">출발</span>
                        <DatePicker
                            className="datepicker"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
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
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
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
                    {/*
                     <div className="create-text">
                        <span className="title">도착 시각</span>
                        <input type="text" className="input-small"></input>
                        <span className="span-hour">시</span>
                        <input type="text" className="input-small"></input>
                        <span className="span-minute">분</span>
                    </div>
                     */}
                    <div className="make-text">
                        <span className="title">장소</span>
                        <span className="span-start">출발</span>
                        <input type="text" className="place" maxLength="15"></input>
                    </div>
                    <div className="make-text">
                        <span className="span-start">도착</span>
                        <input type="text" className="input-place place" maxLength="15"></input>
                    </div>
                    <div className="make-text">
                        <span className="title">인원</span>
                        <input type="text" maxLength="8"></input>
                    </div>
                </div>
                <div className="make-content">
                    <span>소개</span>
                    <input type="textarea" maxLength="20"></input>
                </div>
                <button>모임 만들기</button>
            </div>
        </div>
    );
}

export default Create;
