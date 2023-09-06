import React from "react";

import "../stylesheet/modal.scss";
function Modify(props) {
  return (
    <div
      className="create-outside"
      onClick={() => {
        props.setModifyOpen(false);
      }}
    >
      <div
        className="create-background"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div style={{ marginTop: "50px" }}>
          <div className="create-text">
            <span>제목</span>
            <input type="text" maxLength="8" />
          </div>
          <div className="create-text">
            <span>날짜</span>
            <input type="text" maxLength="8" />
          </div>

          <div className="create-content">
            <span>내용</span>
            <input type="textarea" maxLength="20" />
          </div>
        </div>

        <button className="button">수정하기</button>
      </div>
    </div>
  );
}

export default Modify;
