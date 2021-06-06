import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import "./Posts.css";

const Posts = ({ nweets }) => {
  const [subject, setSubject] = useState("");

  useEffect(() => {
    var tmp = window.location.href.split("/");
    tmp = tmp[tmp.length - 1].split("?");
    var subject = decodeURI(tmp[1]);
    console.log(subject);
    setSubject(subject);
  });

  return (
    <div className="classpost">
      <p>공지사항</p>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> 번호</TableCell>
            <TableCell> 제목</TableCell>
            <TableCell> 작성자</TableCell>
            <TableCell> 등록일</TableCell>
            <TableCell> 조회수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nweets.map((nweet, index) => (
            <TableRow key={nweet.id}>
              <TableCell align="left">{index}</TableCell>
              <TableCell align="left">
                <Link
                  to={{
                    pathname: `/class/?${subject}?post=${nweet.id}`,
                  }}
                >
                  {nweet.title}
                </Link>
              </TableCell>
              <TableCell align="left">{nweet.user}</TableCell>
              <TableCell align="left">{change_date(nweet.createAt)}</TableCell>
              <TableCell align="left">{nweet.times}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

function change_date(date_time) {
  var moment = require("moment");

  const ymd = moment(date_time).format("YYYY년 MM월 DD일");
  return ymd;
}

export default Posts;
