import React from "react";
import { Link } from "react-router-dom";

//스타일시트 파일
import "../stylesheet/navbar.scss";

function Navbar() {
    return (
        <div className="Nav-background">
            <div className="Navbar">
                <span>
                    <p>
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "#42D084" }}
                        >
                            plowithme
                        </Link>
                    </p>
                </span>
                <div className="main-list">
                    <ul>
                        <li>
                            <Link
                                to="/club"
                                style={{
                                    textDecoration: "none",
                                    color: "#3EB977",
                                }}
                            >
                                모임
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/community"
                                style={{
                                    textDecoration: "none",
                                    color: "#3EB977",
                                }}
                            >
                                커뮤니티
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/myPage"
                                style={{
                                    textDecoration: "none",
                                    color: "#3EB977",
                                }}
                            >
                                마이페이지
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
