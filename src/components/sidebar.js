import React, { useState } from "react";
import Post from "../components/post.js";

//스타일시트
import "../stylesheet/sidebar.scss";

export default function Sidebar() {
  const [postOpen, setPostOpen] = useState(false);
  return (
    <div className="sidemenu">
      {/* 게시글 작성 버튼 */}
      <div
        onClick={() => {
          setPostOpen(true);
        }}
      >
      <button className="side-button"> +</button> 
        <p >게시글 작성</p>
      </div>
   
      {postOpen === true ? <Post setPostOpen={setPostOpen} /> : null}
    </div>
  );
}
