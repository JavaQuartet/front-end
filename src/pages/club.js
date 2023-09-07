import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//컴포넌트
import Navbar from "../components/navbar.js";
import Detail from "../components/detail.js";
import Create from "../components/create.js";

//스타일시트
import "../stylesheet/club.scss";
function Club(props) {
    const BASE_URL = "http://3.39.75.222:8080";
    const API_URL = "https://pixabay.com/api";
    const API_KEY = process.env.REACT_APP_API_KEY;
    const navigate = useNavigate();
    const token = sessionStorage.getItem("accessToken");
    const [isLogin, setIsLogin] = useState(false);
    const [img, setImg] = useState([]);
    const [clubList, setClubList] = useState([]);
    const [classNo, setClassNo] = useState(0);

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [dDay, setDDay] = useState([]);

    const [maker, setMaker] = useState("");
    useEffect(() => {
        getList();
    }, [search]);

    useEffect(() => {
        getImage();
        getList();
    }, []);

    const getImage = () => {
        axios
            .get(
                `${API_URL}/?key=${API_KEY}&lang=ko&image_type=photo&category=travel&per_page=100&safesearch=true&order=popular`
            )
            .then((res) => {
                setImg(res.data.hits);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getList = () => {
        if (search === "") {
            axios
                .get(`${BASE_URL}/class/region`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: null,
                        size: 20,
                    },
                })
                .then((result) => {
                    if (result.status === 200) {
                        setClubList(result.data.data);
                    }
                })
                .catch((error) => {
                    if (error.status === 401) {
                        console.log("권한없음");
                    } else if (error.status === 400) {
                        console.log("잘못 요청");
                    }
                });
        } else {
            axios
                .get(`${BASE_URL}/class/search`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: null,
                        size: 20,
                        keyword: search,
                    },
                })
                .then((result) => {
                    if (result.status === 200) {
                        setClubList(result.data.data);
                    }
                })
                .catch((error) => {
                    if (error.status === 401) {
                        console.log("권한없음");
                    } else if (error.status === 400) {
                        console.log("잘못 요청");
                    }
                });
        }
    };

    return (
        <div>
            <div className="club-background">
                {/* 검색창 */}
                <div className="search">
                    <form>
                        <input
                            type="text"
                            placeholder="지역을 입력해주세요."
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                                e.preventDefault();
                            }}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setSearch(searchInput);
                            }}
                        >
                            <img src={require("../img/search.png")} alt="search" />
                        </button>
                    </form>
                    <div className="tag">
                        <span
                            onClick={() => {
                                setSearch("서울");
                            }}
                        >
                            # 서울
                        </span>
                        <span
                            onClick={() => {
                                setSearch("경기");
                            }}
                        >
                            # 경기
                        </span>
                        <span
                            onClick={() => {
                                setSearch("인천");
                            }}
                        >
                            # 인천
                        </span>
                        <span
                            onClick={() => {
                                setSearch("전라");
                            }}
                        >
                            # 전라
                        </span>
                        <span
                            onClick={() => {
                                setSearch("강원");
                            }}
                        >
                            # 강원
                        </span>
                        <span
                            onClick={() => {
                                setSearch("경상");
                            }}
                        >
                            # 경상
                        </span>
                        <span
                            onClick={() => {
                                setSearch("대전");
                            }}
                        >
                            # 대전
                        </span>
                        <span
                            onClick={() => {
                                setSearch("부산");
                            }}
                        >
                            # 부산
                        </span>
                    </div>
                </div>
                {/* 모임만들기 버튼 */}
                <div
                    className="club-making"
                    onClick={() => {
                        if (token === null) {
                            navigate("/login");
                        } else {
                            setCreateOpen(true);
                        }
                    }}
                >
                    <button>+</button>
                    <p>모임만들기</p>
                </div>
                <div className="club-main">
                    {clubList.map((n, i) => {
                        let placeStr =
                            clubList[i].startRegion.split(" ")[0] +
                            " " +
                            clubList[i].startRegion.split(" ")[1];
                        return (
                            <div
                                className="club-item"
                                onClick={() => {
                                    if (token === null) {
                                        navigate("/login");
                                    } else {
                                        setClassNo(clubList[i].class_Id);
                                        setMaker(clubList[i].maker_id);
                                        setModalOpen(true);
                                    }
                                    /*
                                    navigate(`/detail/${clubList[i].classParticipantsEntityList[0].participant_id}
                                    `);
                                    */
                                }}
                            >
                                <img src={`${img[i].previewURL}`} />
                                <div>
                                    <p className="club-title">{clubList[i].title}</p>
                                    <p className="club-content">{clubList[i].description}</p>
                                    <div className="people">
                                        <img
                                            className="people-icon"
                                            src={require("../img/people.png")}
                                        />
                                        <span className="people-text">
                                            {clubList[i].member_current}/{clubList[i].member_max}
                                        </span>
                                        <span className="place">{placeStr}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {modalOpen == true ? (
                    <Detail
                        setModalOpen={setModalOpen}
                        classNo={classNo}
                        token={token}
                        maker={maker}
                    />
                ) : null}
                {createOpen == true ? <Create setCreateOpen={setCreateOpen} token={token} /> : null}
            </div>
        </div>
    );
}

export default Club;
