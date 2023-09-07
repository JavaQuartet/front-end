import React, { useState } from "react";
import "../stylesheet/modal.scss";
import axios from "axios";

let t = sessionStorage.getItem("accessToken");
console.log(t);

function Post(props) {
  const [isArtistSelectOpen, setArtistSelectOpen] = useState(false);
  const [category, setCategory] = useState(1);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCustomFileInputClick = () => {
    document.getElementById("file-input").click();
  };
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setSelectedImage(selectedImage);
      console.log(selectedImage);
    }
    
  };

  const handlePostSubmit = (e) => {
    const postData = {
      title: title,
      contents: contents,
      category: category,
      file: selectedImage,
    };

    axios
      .post("http://3.39.75.222:8080/board/posting", postData, {
        headers: {
          Authorization: `Bearer ${t}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("게시글 등록 성공");
          props.setPostOpen(false);
        } else {
          console.error("게시글 등록 실패:", response.data);
          props.setPostOpen(false);
        }
      })
      .catch((error) => {
        console.error("게시글 등록 중 에러 발생:", error);
        alert('사진 추가 후 다시 작성해 주세요!')
        if (error.response) {
          console.error("Server Error Message:", error.response.data);
        }


        props.setPostOpen(false);
      });
  };

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
          <button
            className={`btn-select ${isArtistSelectOpen ? "on" : ""}`}
            onClick={() => setArtistSelectOpen(!isArtistSelectOpen)}
          >
            카테고리 선택
          </button>
          <ul className={`list-member ${isArtistSelectOpen ? "on" : ""}`}>
            <li>
              <button
                type="button"
                className="name"
                onClick={() => {setCategory(1)}} 
              >
                자유
              </button>
            </li>
            <li>
              <button
                type="button"
                className="name"
                onClick={() => setCategory(2)} 
              >
                후기
              </button>
            </li>
            <li>
              <button
                type="button"
                className="name"
                onClick={() => setCategory(3)} 
              >
                정보
              </button>
            </li>
          </ul>
        </div>
        <div className="create-text">
          <span>제목</span>
          <input
            type="text"
            value={title}
            maxLength="25"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="create-content">
          <span>내용</span>
          <input
            type="textarea"
            maxLength="80"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <br />
        <br />
        <br />
        <div className="create-image">
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }} 
          />
          <button
            onClick={handleCustomFileInputClick}
            style={{
              marginLeft: "80px",
              border: "none",
              background: "lightgreen",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius:'4px'
            }}
          >
            이미지 추가
          </button>
        </div>

        <button className="button" onClick={handlePostSubmit}>
          작성하기
        </button>
      </div>
    </div>
  );
}

export default Post;
