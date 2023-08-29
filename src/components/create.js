import React, { useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Postcode from "react-daum-postcode";

//스타일시트
import "../stylesheet/create.scss";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);

function Create(props) {
    const [classImageURL, setClassImageURL] = useState("");
    const [classIamgeFile, setClassImageFile] = useState(null);
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [isStart, setIsStart] = useState(true);
    const [startPlace, setStartPlace] = useState("");
    const [endPlace, setEndPlace] = useState("");

    const ImageUpload = (e) => {
        fileInput.current.click();
    };

    const fileInput = useRef(null);
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
                    <img src={`${classImageURL}`} className="club-img" />
                    <img
                        src={require("../img/setting.png")}
                        className="setting-img"
                        onClick={(e) => {
                            ImageUpload();
                        }}
                    />
                    <input
                        type="file"
                        ref={fileInput}
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                let image = window.URL.createObjectURL(file);
                                setClassImageURL(image);
                                setClassImageFile(file);
                            }
                        }}
                        style={{ display: "none" }}
                    />
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
                        <input type="text" maxLength="8"></input>
                    </div>
                </div>
                <div className="make-content">
                    <span>소개</span>
                    <input type="textarea" maxLength="20"></input>
                </div>
                <button>모임 만들기</button>
            </div>

            {postModalOpen == true ? (
                <div className="postcode-background">
                    <p>주소 검색</p>
                    <Postcode
                        className="postmodal"
                        onComplete={(data) => {
                            console.log(data);
                            setPostModalOpen(false);

                            let address = "";
                            if (data.address.length < 18) {
                                address = data.address + data.buildingName;
                            } else {
                                address = data.address;
                            }
                            if (isStart === true) {
                                setStartPlace(data.address);
                            } else {
                                setEndPlace(data.address);
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
