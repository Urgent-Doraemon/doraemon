import React from "react";
import EClass from "../components/List";
import Chatbot from "../components/Chatbot"
import logoImg from "../images/cnuLogo.png";
import "./Home.css";

export default () => {
  return (
    <div>
      <div className="header">
        <a href="/">
        <img
          src={logoImg}
          alt="CNU Cybercampus"
          title="충남대학교 사이버캠퍼스"
        />
        </a>
      </div>

      <EClass />

      <Chatbot />
    </div>
  );
};
