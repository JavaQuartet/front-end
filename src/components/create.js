import React from "react";

import "../stylesheet/create.scss";
function Create(props) {
    return (
        <div
            className="create-outside"
            onClick={() => {
                props.setCreateOpen(false);
            }}
        >
            <div
                className="create-background"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="create-image">
                    <img src={require("../img/detail_example.jpg")} className="club-img" />
                    <img src={require("../img/setting.png")} className="setting-img" />
                </div>
                <div className="create-info">
                    <div className="create-text">
                        <span>모임 이름</span>
                        <input type="text" maxLength="8"></input>
                    </div>
                    <div className="create-text">
                        <span>날짜</span>
                        <input type="text" maxLength="8"></input>
                    </div>
                    <div className="create-text">
                        <span>시간</span>
                        <input type="text" maxLength="8"></input>
                    </div>
                    <div className="create-text">
                        <span>장소</span>
                        <input type="text" maxLength="8"></input>
                    </div>
                    <div className="create-text">
                        <span>인원</span>
                        <input type="text" maxLength="8"></input>
                    </div>
                </div>
                <div className="create-content">
                    <span>소개</span>
                    <input type="textarea" maxLength="20"></input>
                </div>
                <button>모임 만들기</button>
            </div>
        </div>
    );
}

export default Create;
