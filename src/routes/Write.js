import React, { useState } from "react";
import { dbService } from "../fbase";

export default ({ className }) => {
  const [nweet, setNweet] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [subject, setSubject] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection(subject).add({
      title,
      user,
      text: nweet,
      createAt: Date.now(),
      times: 0,
    });
    setTitle("");
    setUser("");
    setNweet("");
    setSubject("");
  };
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;

    if (name === "title") {
      setTitle(value);
    } else if (name === "user") {
      setUser(value);
    } else if (name === "text") {
      setNweet(value);
    } else if (name === "subject") {
      setSubject(value);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="subject"
            value={subject}
            onChange={onChange}
            type="text"
            placeholder="과목명을 입력하세요."
            maxLength={120}
          />
        </div>
        <input
          name="title"
          value={title}
          onChange={onChange}
          type="text"
          placeholder="제목을 입력하세요."
          maxLength={120}
        />
        <input
          name="user"
          value={user}
          onChange={onChange}
          type="text"
          placeholder="작성자를 입력하세요."
          maxLength={120}
        />
        <div>
          <input
            name="text"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="내용을 입력하세요."
            maxLength={300}
          />
        </div>
        <input type="submit" value="등록하기" />
      </form>
    </div>
  );
};
