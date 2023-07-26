import "../stylesheet/club.scss";
import Navbar from "../components/navbar.js";
import Detail from "../components/detail.js";
import React, { useState } from "react";
function Club() {
    const [clubList, setClubList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="club-background">
                {/* 검색창 */}
                <div className="search">
                    <form>
                        <input type="text" placeholder="지역을 입력해주세요." />
                        <button>
                            <img src={require("../img/search.png")} alt="search" />
                        </button>
                    </form>
                    <div className="tag">
                        <span># 동국대</span>
                        <span># 강동구</span>
                        <span># 미사</span>
                    </div>
                </div>
                {/* 모임만들기 버튼 */}
                <div className="club-making">
                    <button>+</button>
                    <p>모임만들기</p>
                </div>
                <div className="club-main">
                    <ul>
                        {clubList.map(() => {
                            return (
                                <li
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}
                                >
                                    <img
                                        src={require("../img/club_example.jpg")}
                                        alt="club_example"
                                    />
                                    <div>
                                        <p className="club-title">함께 산책</p>
                                        <p className="club-content">
                                            동국대 주변 같이 걸으실 분 구해요
                                        </p>
                                        <div className="people">
                                            <img
                                                className="people-icon"
                                                src={require("../img/people.png")}
                                            />
                                            <span className="people-text">2/5</span>
                                            <span className="d-Day">D-1</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {modalOpen == true ? <Detail setModalOpen={setModalOpen} /> : null}
            </div>
        </div>
    );
}

export default Club;
