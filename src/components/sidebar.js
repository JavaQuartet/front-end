import { Link } from "react-router-dom";
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
        <img src={require("../img/posting.png")} alt="post" className="post" />
        <p style={{ fontSize: "11px", marginLeft: "8px" }}>게시글 작성</p>
      </div>
      <Link to="/">
        <img
          src={require("../img/profile.jpg")}
          alt="profile"
          className="photo"
        />
      </Link>
      <Link to="/">
        <img
          src={require("../img/profile.jpg")}
          alt="profile"
          className="photo"
        />
      </Link>
      <Link to="/">
        <img
          src={require("../img/profile.jpg")}
          alt="profile"
          className="photo"
        />
      </Link>
      <Link to="/">
        <img
          src={require("../img/profile.jpg")}
          alt="profile"
          className="photo"
        />
      </Link>
      <Link to="/">
        <img
          src={require("../img/profile.jpg")}
          alt="profile"
          className="photo"
        />
      </Link>
      <Link to="/">
        <img
          src={require("../img/profile.jpg")}
          alt="profile"
          className="photo"
        />
      </Link>
      {postOpen === true ? <Post setPostOpen={setPostOpen} /> : null}
    </div>
  );
}
