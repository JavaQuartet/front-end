import React, { useState } from "react";

import "../stylesheet/modal.scss";
function Modify(props) {
  const [modifiedTitle, setModifiedTitle] = useState(props.selectedPost.title);
  const [modifiedContents, setModifiedContents] = useState(props.selectedPost.contents);

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
        <div className="create-text" >
        <span>제목</span>

            <input
              type="text"
              style={{ wordBreak: "break-all" }}
              value={modifiedTitle}
              maxLength="25"
              onChange={(e) => {setModifiedTitle(e.target.value); console.log(modifiedTitle)}}
            />
          </div>

          <div className="create-content" >
            <span>내용</span>
            <input
              type="textarea"
              maxLength="80"
              value={modifiedContents}
              onChange={(e) => {setModifiedContents(e.target.value); console.log(modifiedContents)}}
            />
          </div>
        </div>

        <button
          className="button"
          onClick={() =>
           { props.handleModifySubmit(modifiedTitle, modifiedContents);
            console.log(modifiedTitle);
            console.log(modifiedContents);

          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
}

export default Modify;
