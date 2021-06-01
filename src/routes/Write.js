import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import { dbService } from "../fbase";
import "./Write.css";
import TextField from '@material-ui/core/TextField';
import logoImg from "../images/cnuLogo.png";
import Button from '@material-ui/core/Button';

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
    {alert("공지사항이 등록되었습니다.");}
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
      <div className="header">
        <img
          src={logoImg}
          alt="CNU Cybercampus"
          title="충남대학교 사이버캠퍼스"
        />
      </div>
      <div className="container">
        <p className="tableName">공지 등록</p>
        <form onSubmit={onSubmit}>
          <Table className="tableWrite">
            <TableHead>
              <TableRow>
                <TableCell className="tablehead">과목명</TableCell>
                <TableCell className="tabledata">
                  <TextField
                    className="input"
                    id="outlined-basic"
                    variant="outlined"
                    name="subject"
                    value={subject}
                    onChange={onChange}
                    type="text"
                    placeholder="과목명을 입력하세요."
                    maxLength={120}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="tablehead">제목</TableCell>
                <TableCell className="tabledata">
                <TextField
                  className="input"
                  id="outlined-basic"
                  variant="outlined"
                  name="title"
                  value={title}
                  onChange={onChange}
                  type="text"
                  placeholder="제목을 입력하세요."
                  maxLength={120}
                />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="tablehead">작성자</TableCell>
                <TableCell className="tabledata">
                <TextField
                  className="input"
                  id="outlined-basic"
                  variant="outlined"
                  name="user"
                  value={user}
                  onChange={onChange}
                  type="text"
                  placeholder="작성자를 입력하세요."
                  maxLength={120}
                />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan='2' className="tabledata" >
                  <div>
                  <TextField
                    className="input inputcontent"
                    id="outlined-basic"
                    variant="outlined"
                    name="text"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="내용을 입력하세요."
                    maxLength={300}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button variant="outlined" type="submit" className="submitbtn"> 등록</Button>
        </form>
      </div>
    </div>
  );
};
