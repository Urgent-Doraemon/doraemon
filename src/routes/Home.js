import React from "react";
import EClass from "../components/List";
import Chatbot from "../components/Chatbot"
import logoImg from "../images/cnuLogo.png";
import "./Home.css";
// import { Link } from "react-router-dom";

export default () => {
  // const className = "데이터과학";
  return (
    <div>
      <div className="header">
        <img
          src={logoImg}
          alt="CNU Cybercampus"
          title="충남대학교 사이버캠퍼스"
        />
      </div>

      <EClass />
      {/* <Link
        to={{
          pathname: `/class`,
          state: {
            className,
          },
        }}
      >
        {className}
      </Link> */}
      <Chatbot />
    </div>
  );
};
