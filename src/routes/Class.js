import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../fbase";

import Posts from "../components/Posts";
import Post from "../components/Post";
import logoImg from "../images/cnuLogo.png";

export default () => {
  const [nweets, setNweets] = useState([]);
  const [subject, setSubject] = useState("");
  const [isPost, setIsPost] = useState(false);
  // const [post, setPost] = useState("");

  useEffect(() => {
    var tmp = window.location.href.split("/");
    tmp = tmp[tmp.length - 1].split("?");
    var subject = decodeURI(tmp[1]);
    if (tmp.length > 2) {
      setIsPost(true);
      // setPost(tmp[2].split("=")[1]);
    }

    dbService.collection(subject).onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        user: doc.user,
        createAt: doc.createAt,
        times: doc.times,
        ...doc.data(),
      }));

      setNweets(nweetArray);
      setSubject(subject);
    });
  }, []);

  return (
    <>
      <div className="header">
        <img
          src={logoImg}
          alt="CNU Cybercampus"
          title="충남대학교 사이버캠퍼스"
        />
      </div>
      {isPost ? (
        <div>
          <Post />
        </div>
      ) : (
        <>
          <div>
            <Posts nweets={nweets} />
          </div>
        </>
      )}
    </>
  );
};
