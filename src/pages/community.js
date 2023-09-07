import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
//컴포넌트
import Navbar from "../components/navbar.js";
import Detail from "../components/detail.js";
import Create from "../components/create.js";
import Modify from "../components/modify.js";
import Sidebar from "../components/sidebar.js";
//스타일시트
import "../stylesheet/community.scss";
import "../stylesheet/myPage.scss";
import axios from "axios";

function Community() {
  const [modalOpen, setModalOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("전체");
  const [comments, setComments] = useState(new Map());
  const [postClickStates, setPostClickStates] = useState({});
  const [commentInputs, setCommentInputs] = useState({});


  //token
  let t = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  let [modal, setModal] = useState(false);

  let [msgModal, setMsgModal] = useState(false);
  const fetchURL = "http://3.39.75.222:8080";



  // 커뮤니티 게시글 조회
  useEffect(() => {
    axios

      .get(fetchURL+"/board")
      .then((result) => {
        if (result.status === 200) {
          console.log("커뮤니티 전체 게시글 조회 성공");
          setData(result.data.data);
          setFilteredData(result.data.data);
          const commentPostIdsArray = [];

          //커뮤니티 게시글 댓글 조회
          result.data.data.forEach((post) => {
            axios

              .get(fetchURL+`/board/${post.postId}/comments`)

              .then((response) => {
                if (response.status === 200) {
                  const commentsForPost = response.data.data;

                  if (commentsForPost.length > 0) {
                    commentPostIdsArray.push(commentsForPost[0].post_id);
                  }

                  setComments(  (prevComments) =>
                  new Map([[post.postId, commentsForPost], ...prevComments])
              ); 
                } else {
                  console.log("게시글을 찾을 수 없습니다.");
                  navigate("/login");
                }
              })
              .catch((error) => {
                console.error(
                  `Error fetching comments for postId ${post.postId}:`
                );
              });
          });
        }
      })
      .catch((error) => {
        console.log("게시글 조회 에러");
        navigate("/login");
      });
  }, [createOpen]);

  // 커뮤니티 게시글 카테고리 나누기
  const filterDataByCategory = (category) => {
    setCurrentFilter(category);
    if (category === "전체") {
      setFilteredData(data);
    } else if (category === "자유") {
      const filtered = data.filter((item) => item.category === 1);
      setFilteredData(filtered);
    } else if (category === "후기") {
      const filtered = data.filter((item) => item.category === 2);
      setFilteredData(filtered);
    } else if (category === "정보") {
      const filtered = data.filter((item) => item.category === 3);
      setFilteredData(filtered);
    }
  };

  // 댓글 등록
  const addComment = (postId) => {
    if (commentInputs[postId] && commentInputs[postId].trim() !== "") {
      const commentData = {
        contents: commentInputs[postId],
      };

      axios
        .post(`http://3.39.75.222:8080/board/${postId}/comments`, commentData, {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const updatedComments = new Map(comments);

            if (!updatedComments.has(postId)) {
              updatedComments.set(postId, []);
            }
            
            updatedComments
              .get(postId)
              .unshift({ contents: commentInputs[postId] }); 
            setComments(updatedComments);
            setCommentInputs(""); 
            console.log("댓글 등록 성공");
          } else {
            console.error("댓글 추가 실패:", response.data);
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("댓글 추가 중 에러 발생:", error);
        });
    }
  };

  //게시글 수정
  const handleModifySubmit = (modifiedTitle, modifiedContents) => {

    const postData = {
      title: modifiedTitle,
      contents: modifiedContents,
      
    };

    axios
      .post("http://3.39.75.222:8080/board/posting", postData, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("게시글 등록 성공");
        } else {
          console.error("게시글 등록 실패:", response.data);
        }
      })

    const modifiedData = {
      title: modifiedTitle,
      contents: modifiedContents,
    };
    console.log(modifiedTitle);
    console.log(modifiedContents);
    axios
      .patch(
        `http://3.39.75.222:8080/board/${selectedPost.postId}`,
        modifiedData,
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      )
      .then((response) => {
        console.log(selectedPost.postId);

        if (response.status === 200) {
          console.log("게시글 수정 성공");
          // 화면 업데이트
          const updatedData = [...data];
          const index = updatedData.findIndex(
            (item) => item.postId === selectedPost.postId
          );
          if (index !== -1) {
            updatedData[index].title = modifiedTitle;
            updatedData[index].contents = modifiedContents;
          }
  
           setFilteredData(updatedData);
           setData(updatedData)

          setModifyOpen(false); // 모달 닫기
        } else {
          console.error("게시글 수정 실패:", response.data);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("게시글 수정 중 에러 발생:", error);
        alert("사용자 계정 불일치");
        setModifyOpen(false);
        navigate("/login");
      });
  };

  //게시글 하트
  const toggleHeart = (postId) => {
    setPostClickStates((prevClickStates) => ({
      ...prevClickStates,
      [postId]: !prevClickStates[postId],
    }));
  };

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="community-background" style={{}}>
        {/* 검색창 */}
        <div className="search">
          <form>
            <Link to="/mypage">
              <img
                src={require("../img/profile.jpg")}
                alt="profile"
                className="profile"
              />
            </Link>
            <input type="text" placeholder="검색 내용" />
            <button>
              <img
                src={require("../img/search.png")}
                alt="search"
                className="searchicon"
              />
            </button>
          </form>

          <div className="tag">
            <span onClick={() => filterDataByCategory("정보")}>정보</span>
            <span onClick={() => filterDataByCategory("후기")}>후기</span>
            <span onClick={() => filterDataByCategory("자유")}>자유</span>
            <span onClick={() => filterDataByCategory("전체")}>전체</span>
            <div className="line"></div>
          </div>
        </div>

        <div className="community-main">
          <ul>
            {filteredData.map((item, i) => {
              return (
                <li key={i}>
                  <div>
                    <div className="boxheader ">
                      <img
                        src={require("../img/profile.jpg")}
                        alt="profile"
                        className="userImage"
                      />{" "}
                      <h3>{item.writer}</h3>

                      {/* 게시글 수정 */}
                      <div>
                        <img
                          src={require("../img/modify.png")}
                          alt="modify"
                          className="modify"
                          onClick={() => {
                            setSelectedPost(item);
                            setModifyOpen(true);
                            console.log(item.title);
                          }}
                        />
                        <p className="club-title">{item.title}</p>
                        
                        <p className="club-content">{item.contents}</p>
                      </div>
                    </div>

                    <img
                      src={item.imagePath}
                      alt="club_example"
                      className="act"
                    />
                    <div
                      className={`heart ${
                        postClickStates[item.postId] ? "heart-clicked" : ""
                      }`}
                      onClick={() => {
                        toggleHeart(item.postId);
                        console.log(item.postId);
                      }}
                    ></div>
                    <div className="footer">
                    <div style={{ display: "flex", position: "row" }}>
                        <input
                          type="text"
                          value={commentInputs[item.postId] || ""}
                          onChange={(e) => {
                            setCommentInputs({
                              ...commentInputs,
                              [item.postId]: e.target.value,
                            });
                          }}
                          placeholder="댓글을 입력하세요"
                          className="comment-input"
                        />
                    
                        <button
                          onClick={() => addComment(item.postId)}
                          className="comment-button"
                        >
                          등록
                        </button>
                      </div>
                      <br/>
                      {comments.has(item.postId)
                        ? comments.get(item.postId).map((comment, index) => (
                            <div className="comment" key={index}>
                              <img
                                alt="팔로워 프로필 사진"
                                src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                              />
                              <p>{comment.contents}</p>
                            </div>
                          ))
                        : null}

                      
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {modalOpen == true ? <Detail setModalOpen={setModalOpen} /> : null}
        {createOpen == true ? <Create setCreateOpen={setCreateOpen} /> : null}
        {modifyOpen == true ? (
          <Modify
            setModifyOpen={setModifyOpen}
            selectedPost={selectedPost}
            handleModifySubmit={handleModifySubmit}
            
          />
        ) : null}
      </div>
    </div>
  );
}

export default Community;
