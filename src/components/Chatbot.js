import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { HashRouter as Route } from "react-router-dom";
import { useEffect, useState } from "react";
import chatbotImg from "../images/doraemon.png";
import "./Chatbot.css";
import { firebaseInstance } from "../fbase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

const Chatbot = () => {

    const [checkNew, setcheckNew] = useState(false);
    const [NewNotice, setNewNotice] = useState(true); // 기본은 false! 나는 테스트 해보려고 true로 한거야
    
    const clickChatbot = () => {
      setcheckNew(true);  
      setNewNotice(false);
    }

    useEffect(async () => {
      // 여기서 DB 데이터 변화 확인하고
      // 변화가 있으면 setNewNotice(true), 아니면 그냥 냅두기
      // 그리고 밑에 render에서 map으로 link랑 이름만 수정하면돼!
      // 그 담 primary에 내용 넣으면돼!
    }, []);

    return (
      <>
        <div className="chatbot">
          {NewNotice && <Button className='newButton' onClick={clickChatbot} variant="outlined" color="primary">새로운 공지가 있어요!</Button>}
          {checkNew && 
          <div className={Chatbot.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemLink target="_blank" href="#class?데이터과학?post=GV58N4sXhKALe5kKrVLp">
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="[데이터과학] 긴급 공지입니다 이번주 주말에 시험을 봅니다." />
            </ListItemLink>
            <ListItemLink target="_blank" href="#class?최신컴퓨터특강">
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="[최신컴퓨터특강] 기말고사 취소입니다." />
            </ListItemLink>
          </List>
          </div>
          }
          <div className="img">
          <img
            src={chatbotImg}
            className="doraemon_img"
          />
          </div>
        </div>

      </>
    );
};
  

export default Chatbot;
  
