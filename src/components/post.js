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
  const [imgPath, setImgPath] = useState(""); // State to store the image path
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setSelectedImage(selectedImage);
      console.log(selectedImage);

      // Extract the path from the selected image and set it in the imgPath state
      const imagePath = URL.createObjectURL(selectedImage);
      setImgPath(imagePath);
      console.log(imagePath)
    }
  };

  const handlePostSubmit = () => {
    const postData = {
      title: title,
      contents: contents,
      category: category,
      imgPath: imgPath,
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
          props.setPostOpen(false);
        } else {
          console.error("게시글 등록 실패:", response.data);
          props.setPostOpen(false);
        }
      })
      .catch((error) => {
        console.error("게시글 등록 중 에러 발생:", error);
  
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
                onClick={() => setCategory(1)} // 자유 카테고리 선택
              >
                자유
              </button>
            </li>
            <li>
              <button
                type="button"
                className="name"
                onClick={() => setCategory(2)} // 후기 카테고리 선택
              >
                후기
              </button>
            </li>
            <li>
              <button
                type="button"
                className="name"
                onClick={() => setCategory(3)} // 정보 카테고리 선택
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
            maxLength="8"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="create-content">
          <span>내용</span>
          <input
            type="textarea"
            maxLength="20"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <br/><br/><br/>
        <div className="create-image">
          <span>이미지 업로드</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
          />
        </div>

        <button className="button" onClick={handlePostSubmit}>
          작성하기
        </button>
      </div>
    </div>
  );
}

export default Post;
