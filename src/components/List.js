// 강의실 목록
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { HashRouter as Route } from "react-router-dom";
import "./List.css";
import Class from "../routes/Class";

function createData(id, year, division, group, name, onoff, professor, score) {
  return { id, year, division, group, name, onoff, professor, score };
}

const rows = [
  createData(
    1,
    "2021년도 1학기",
    "본교",
    "학부",
    "데이터과학",
    "Blended",
    "임성수",
    "3"
  ),
  createData(
    2,
    "2021년도 1학기",
    "본교",
    "학부",
    "인간과 컴퓨터 상호작용",
    "Blended",
    "김재정",
    "3"
  ),
  createData(
    3,
    "2021년도 1학기",
    "본교",
    "학부",
    "최신컴퓨터특강",
    "Blended",
    "권택근",
    "3"
  ),
];

const EClass = () => {
  return (
    <div className="classList">
      <p className="tableName">
        <span style={{ color: "orange" }}>■ </span>
        강의목록
      </p>
      <Table className="listTable">
        <TableHead className="tablehead">
          <TableRow>
            <TableCell className="tableheaders"> 구분</TableCell>
            <TableCell className="tableheaders"> 소속</TableCell>
            <TableCell className="tableheaders"> 강의명</TableCell>
            <TableCell className="tableheaders"> 년도/학기</TableCell>
            <TableCell className="tableheaders"> On/Off</TableCell>
            <TableCell className="tableheaders"> 교수</TableCell>
            <TableCell className="tableheaders"> 학점</TableCell>
            <TableCell className="tableheaders"> 강의실 입장</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.division}</TableCell>
              <TableCell align="left">{row.group}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.year}</TableCell>
              <TableCell align="left">{row.onoff}</TableCell>
              <TableCell align="left">{row.professor}</TableCell>
              <TableCell align="left">{row.score}</TableCell>

              <TableCell align="left">
                <Link
                  to={{
                    pathname: `/class?${row.name}`,
                  }}
                >
                  강의실 입장
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EClass;
