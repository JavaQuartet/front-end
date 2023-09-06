import React, {useState} from "react";

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
          <div className="create-text">
            <span>제목</span>
            <input
              type="text"
              maxLength="8"
              value={modifiedTitle}
              onChange={(e) => setModifiedTitle(e.target.value)}
            />            
          </div>
         
          <div className="create-content">
            <span>내용</span>
            <input type="textarea" maxLength="20" 
             value={modifiedContents}
             onChange={(e) => setModifiedContents(e.target.value)}/>
          </div>
        </div>

        <button className="button" onClick={() => props.handleModifySubmit(modifiedTitle, modifiedContents)}>
  수정하기
</button>   
</div>
    </div>
  );
}

export default Modify;
