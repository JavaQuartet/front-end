import React, { useState } from "react";
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

function Community() {
  const [communityList, setCommunityList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [modalOpen, setModalOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);

  let navigate = useNavigate();

  let [modal, setModal] = useState(false);

  let [msgModal, setMsgModal] = useState(false);
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="community-background">
        <div className="mypage-container">
          <FontAwesomeIcon
            onClick={() => {
              setMsgModal(!msgModal);
            }}
            className="alert"
            icon={faBell}
          />
          {msgModal ? (
            <div className="msg-modal">
              {" "}
              {/*알람버튼 클릭 시 댓글창에 있는 댓글들 목록 보여주는 모달창*/}
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>저도 이번 플로깅 참여했어요 ㅎㅎㅎ</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>와 저도 참여하고 싶네요 .... 다음에 꼭 갈게요</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>전 이번 플로깅 너무 좋았어요. 강추합니다 ^^</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>와 저도 다음 기회에 꼭 참여할게요!!</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>와 저도 다음 기회에 꼭 참여할게요!!</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>와 저도 다음 기회에 꼭 참여할게요!!</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>와 저도 다음 기회에 꼭 참여할게요!!</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>와 저도 다음 기회에 꼭 참여할게요!!</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>와 저도 다음 기회에 꼭 참여할게요!!</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>저도 이번 플로깅 참여했어요 ㅎㅎㅎ</p>
                </div>
                <hr />
              </div>
              <div className="msg">
                <div className="msg-content">
                  <img
                    alt="팔로워 프로필 사진"
                    src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                  />
                  <p>와 저도 참여하고 싶네요 .... 다음에 꼭 갈게요</p>
                </div>
                <hr />
              </div>
            </div>
          ) : null}
        </div>
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
            <span>정보</span>
            <span>후기</span>
            <span>자유</span>
            <span>전체</span>
            <div className="line"></div>
          </div>
        </div>

        <div className="community-main">
          <ul>
            {communityList.map(() => {
              return (
                <li>
                  <div>
                    <div className="boxheader ">
                      <img
                        src={require("../img/profile.jpg")}
                        alt="profile"
                        className="userImage"
                      />{" "}
                      <h3>닉네임</h3>
                      {/* 게시글 수정 */}
                      <div
                        onClick={() => {
                          setModifyOpen(true);
                        }}
                      >
                        <img
                          src={require("../img/modify.png")}
                          alt="modify"
                          className="modify"
                        />
                      </div>
                    </div>
                    <p className="club-title">플로깅 참여 후기</p>
                    <p className="club-content">제 첫 플로깅입니다 ~~~</p>

                    <img
                      src={require("../img/club_example.jpg")}
                      alt="club_example"
                      className="act"
                    />
                    <div className="icon">
                      <img
                        className="comment-icon"
                        src={require("../img/comment.png")}
                      />
                    </div>
                    <div className="footer">
                      <div className="comment">
                        <img
                          alt="팔로워 프로필 사진"
                          src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                        />
                        <p>저도 이번 플로깅 참여했어요 ㅎㅎㅎ</p>
                      </div>
                      <div className="comment">
                        <img
                          alt="팔로워 프로필 사진"
                          src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                        />
                        <p>와 저도 참여하고 싶네요 .... 다음에 꼭 갈게요</p>
                      </div>
                      <div className="comment">
                        <img
                          alt="팔로워 프로필 사진"
                          src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                        />
                        <p>전 이번 플로깅 너무 좋았어요. 강추합니다 ^^</p>
                      </div>
                      <div className="comment">
                        <img
                          alt="팔로워 프로필 사진"
                          src="https://www.shutterstock.com/image-photo/surreal-concept-roll-world-dice-600w-1356798002.jpg"
                        />
                        <p>와 저도 다음 기회에 꼭 참여할게요!!</p>
                      </div>

                      <input></input>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {modalOpen == true ? <Detail setModalOpen={setModalOpen} /> : null}
        {createOpen == true ? <Create setCreateOpen={setCreateOpen} /> : null}
        {modifyOpen == true ? <Modify setModifyOpen={setModifyOpen} /> : null}
      </div>
    </div>
  );
}

export default Community;
