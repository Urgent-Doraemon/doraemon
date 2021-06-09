import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { dbService } from "../fbase";
import "./Post.css";

const Post = () => {
  const [subject, setSubject] = useState("");
  const [postid, setPostid] = useState("");
  const [post, setPost] = useState(null);
  const [flag, setFlag] = useState(false);
  
  useEffect(async () => {
    var tmp = window.location.href.split("/");
    tmp = tmp[tmp.length - 1].split("?");
    var subject = decodeURI(tmp[1]);
    var postid = tmp[2].split("=")[1];

    var post = await dbService
      .collection(subject)
      .doc(postid)
      .get()
      .then((doc) => {
        setPost(doc.data());
        setFlag(true);
      })
      .then(checkPost());

    setSubject(subject);
    setPostid(postid);
  }, []);

const checkPost = async () => {
  // 공지 확인: check -> true로 변경
  if(post.check == false) {
    await dbService.doc(`${subject}/${postid}`).update({
      check: true,
    });
    console.log("update ok!");
  }
};

  return (
    <>
      {flag ? (
        <div className="classpost">
          <p className="tableName">공지사항</p>
          <Table className="tablepost">
            <TableHead>
              <TableRow>
                <TableCell className="tablehead"> 과목명</TableCell>
                <TableCell
                  colSpan="3"
                  style={{ "font-size": "18px", "font-weight": "bold" }}
                >
                  {" "}
                  {subject}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="tablehead"> 제목</TableCell>
                <TableCell> {post.title}</TableCell>
                <TableCell className="tablehead"> 작성자</TableCell>
                <TableCell> {post.user}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="tablehead"> 등록일</TableCell>
                <TableCell> {change_date(post.createAt)}</TableCell>
                <TableCell className="tablehead"> 조회수</TableCell>
                <TableCell> {post.times}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="tablehead"> 첨부파일</TableCell>
                <TableCell colSpan="3"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="postText" colSpan="4">
                  {post.text}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

function change_date(date_time) {
  var moment = require("moment");

  const ymd = moment(date_time).format("YYYY년 MM월 DD일");
  return ymd;
}

export default Post;
