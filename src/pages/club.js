import React, { useEffect, useState } from "react";
import axios from "axios";
//컴포넌트
import Navbar from "../components/navbar.js";
import Detail from "../components/detail.js";
import Create from "../components/create.js";

//스타일시트
import "../stylesheet/club.scss";
function Club(props) {
    const URL = "43.200.172.177:8080";
    const [clubList, setClubList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [modalOpen, setModalOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [token, setToken] = useState("");
    const [tokenType, setTokenType] = useState("");

    const getInfo = async () => {
        const info = await axios
            .post("http://43.200.172.177:8080/auth/login", {
                email: "admin123@naver.com",
                password: "admin123",
            })
            .then((result) => {
                if (result.status === 200) {
                    setToken(result.data.data.accessToken);
                    setTokenType(result.data.data.tokenType);
                    console.log(result.data.data.accessToken);
                }
            })
            .catch((error) => {
                if (error.status === 401) {
                    console.log(error.message);
                } else if (error.status === 400) {
                    console.log(error.message);
                }
            });
    };

    const getList = async () => {
        const list = await axios
            .get("http://43.200.172.177:8080/me", {
                headers: {
                    Authorization:
                        "Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJhZG1pbjEyM0BuYXZlci5jb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE2OTMyODU4ODUsImV4cCI6MTY5Mzg5MDY4NX0.L3ynMbNnfY8RSvM-uzV7GJv9UbkHKewC7Md6aWjHVTg",
                },
            })
            .then((result) => {
                if (result.status === 200) {
                    console.log(result);
                }
            })
            .catch((error) => {
                console.log(`${token}`);
            });
    };
    useEffect(() => {}, []);

    return (
        <div>
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
                <div
                    className="club-making"
                    onClick={() => {
                        setCreateOpen(true);
                    }}
                >
                    <button>+</button>
                    <p>모임만들기</p>
                </div>
                <div className="club-main">
                    {clubList.map(() => {
                        return (
                            <div
                                className="club-item"
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                            >
                                <img src={require("../img/club_example.jpg")} alt="club_example" />
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
                            </div>
                        );
                    })}
                </div>
                {modalOpen == true ? <Detail setModalOpen={setModalOpen} /> : null}
                {createOpen == true ? <Create setCreateOpen={setCreateOpen} /> : null}
            </div>
            <button onClick={getInfo}>token</button>
            <button onClick={getList}>get list</button>
        </div>
    );
}

export default Club;
