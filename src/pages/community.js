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
  const [communityList, setCommunityList] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [modalOpen, setModalOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [data, setData] = useState([]); //GET한 것 저장할 데이터
  const [filteredData, setFilteredData] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("전체");
  const [comments, setComments] = useState(new Map()); //댓글
  const [value, setValue] = useState(""); //input 값
  const [item, setItem]= useState('');
  let [modal, setModal] = useState(false);
  let [msgModal, setMsgModal] = useState(false);
const [postClickStates, setPostClickStates] = useState({});
const [postImages, setPostImages] = useState({});

  //token
  let t = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  // 커뮤니티 게시글 조회
  useEffect(() => {
    axios
      .get("http://3.39.75.222:8080/board")
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data.data);
          console.log("커뮤니티 전체 게시글 조회 성공");
          setData(result.data.data);
          setFilteredData(result.data.data);

          //커뮤니티 게시글 댓글 조회 
          result.data.data.forEach((post) => {
            axios
              .get(`http://3.39.75.222:8080/board/${post.postId}/comments`)
              .then((response) => {
                if (response.status === 200) {
                  const commentsForPost = response.data.data;
                  setComments(
                    (prevComments) =>
                      new Map([ [post.postId, commentsForPost], ...prevComments])
                  );
                } else if (response.status === 500) {
                  console.log("게시글을 찾을 수 없습니다.");
                }
              })
              .catch((error) => {
                console.error(
                  `Error fetching comments for postId ${post.postId}:`,
                  error
                );
              });
          });
        }
      })
      .catch((error) => {
        console.log("에러남");
      });

      
  }, []);

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

  //댓글 등록 기능
  const addComment = (postId) => {
    if (value.trim() !== "") {
      const commentData = {
        contents: value,
      };
  
      // 댓글을 서버에 POST 요청
      axios.post(`http://3.39.75.222:8080//board/${postId}/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // 화면 업데이트
          const updatedComments = new Map(comments);
  
          if (!updatedComments.has(postId)) {
            updatedComments.set(postId, []);
                

            
          }
  
          updatedComments.get(postId).push({ contents: value });
          setComments(updatedComments);
          setValue('');
          console.log('댓글 등록 성공');
        } else {
          console.error("댓글 추가 실패:", response.data);
        }
      })
      .catch((error) => {
        console.error("댓글 추가 중 에러 발생:", error);
      });
    }
  };
  //게시글 수정 기능
  const handleModifySubmit = (modifiedTitle, modifiedContents) => {
    const modifiedData = {
      title: modifiedTitle,
      contents: modifiedContents,
    };
  
    axios
      .patch(`http://3.39.75.222:8080/board/${selectedPost.postId}`, modifiedData, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("게시글 수정 성공");
          // 수정된 내용 화면에 업데이트
          const updatedData = [...data];
          const index = updatedData.findIndex((item) => item.postId === selectedPost.postId);
          if (index !== -1) {
            updatedData[index].title = modifiedTitle;
            updatedData[index].contents = modifiedContents;
          }
          setData(updatedData);
          setModifyOpen(false); // 모달 닫기
        } else {
          console.error("게시글 수정 실패:", response.data);
        }
      })
      .catch((error) => {
        console.error("게시글 수정 중 에러 발생:", error);
        console.log(modifiedTitle);
        alert('사용자 계정 불일치')
        setModifyOpen(false); // 모달 닫기
        navigate('/login');

      });
  };

//댓글 하트
const toggleHeart = (postId) => {
  setPostClickStates((prevClickStates) => ({
    ...prevClickStates,
    [postId]: !prevClickStates[postId],
  }));
}
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="community-background">
      
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
                      <h3>{item.writerId}</h3>
                      {/* 게시글 수정 */}
                      <div
                      
                      >
                        <img
                          src={require("../img/modify.png")}
                          alt="modify"
                          className="modify"
                          onClick={() => {
                            setSelectedPost(item); // 선택한 게시글 정보를 설정
                            setModifyOpen(true);
                          }}
                        />
                        <p className="club-title">{item.title}</p>
                        <p className="club-content">{item.contents}</p>

                      </div>
                    </div>

                    <p className="club-content"></p>

                    <img
                      src={item.img} // Use the imgPath here to display the image

                      alt="club_example"
                      className="act"
                    />
                        <div
  className={`heart ${postClickStates[item.postId] ? 'heart-clicked' : ''}`}
  onClick={() => toggleHeart(item.postId)}
></div>
                    <div className="footer">

                      {comments.has(item.postId)
                        ? comments.get(item.postId).map((comment, index) => (
                            <div className="comment" key={index}>
                              {/* */}
                              <img
                                alt="팔로워 프로필 사진"
                                src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                              />
                              <p>{comment.contents}</p>
                            </div>
                          ))
                        : null}

                      <div style={{ display: "flex", position: "row" }}>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
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
