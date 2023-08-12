import React, { useState } from "react";
import "../stylesheet/modal.scss";

function Post(props) {
  const [isArtistSelectOpen, setArtistSelectOpen] = useState(false);

  return (
    <div
      className="create-outside"
      onClick={() => {
        props.setPostOpen(false);
      }}
    >
      <div
        className="create-background"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="create-info cont-select">
          {/* Toggle the 'isArtistSelectOpen' state on button click */}
          <button
            className={`btn-select ${isArtistSelectOpen ? "on" : ""}`}
            onClick={() => setArtistSelectOpen(!isArtistSelectOpen)}
          >
            카테고리 선택
          </button>
          <ul className={`list-member ${isArtistSelectOpen ? "on" : ""}`}>
            <li>
              <button type="button" className="name">
                자유
              </button>
            </li>
            <li>
              <button type="button" className="name">
                후기
              </button>
            </li>
            <li>
              <button type="button" className="name">
                정보
              </button>
            </li>
          </ul>
        </div>
        <div className="create-text">
          <span>제목</span>
          <input type="text" maxLength="8" />
        </div>
        <div className="create-content">
          <span>내용</span>
          <input type="textarea" maxLength="20" />
        </div>
        <button className="button">작성하기</button>
      </div>
    </div>
  );
}

export default Post;
