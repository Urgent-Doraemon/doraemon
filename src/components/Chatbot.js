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
import { HashRouter as Route } from "react-router-dom";
import { useEffect, useState } from "react";
import chatbotImg from "../images/doraemon.png";
import chatbotImg2 from "../images/doraemon2.jpeg";
import "./Chatbot.css";
import { dbService,firebaseInstance } from "../fbase";

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
    const [subjectList, setSubjectList] = useState(['데이터과학', '인간과 컴퓨터 상호작용', '최신컴퓨터특강'])
    const [checkNew, setcheckNew] = useState(false);
    const [NewNotice, setNewNotice] = useState(true); // 기본은 false! 나는 테스트 해보려고 true로 한거야
    const [newNoticeData, setNewNoticeData] = useState();

    const clickChatbot = () => {
      setcheckNew(true);  
      setNewNotice(false);
    }

    const checkNewNotice = () => {
      setcheckNew(false);  
      setNewNotice(false);
    }

    // useEffect(async () => {
    //   // 여기서 DB 데이터 변화 확인하고
    //   // 변화가 있으면 setNewNotice(true), 아니면 그냥 냅두기
    //   // 그리고 밑에 render에서 map으로 link랑 이름만 수정하면돼!
    //   // 그 담 primary에 내용 넣으면돼!
    // }, []);

    useEffect(() => {
      const newData = {};
      subjectList.forEach((subject) => {
        dbService.collection(subject).where("check", "==", false).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              newData[doc.id] = doc.data();
              newData[doc.id]['subject'] = subject;
          });
        })
      });
      // console.log(Object.keys(newData));
      setNewNoticeData(newData);
    }, []);
  

    return (
      <>
        <div className="chatbot">
          {console.log(newNoticeData) /* DEBUG */}
          {(!checkNew && NewNotice) && <Button className='newButton' onClick={clickChatbot} variant="outlined" color="primary">새로운 공지가 있어요!</Button>}
          {checkNew && 
          <div className={Chatbot.root}>
          <List component="nav" aria-label="main mailbox folders">
            { Object.entries(newNoticeData).map((data) => (
              <ListItemLink target="_blank" href={`#class?${data[1].subject}?post=${data[0]}`}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                { data[1].subject.length + data[1].title.length > 20  
                  ? <ListItemText primary={`[${data[1].subject.concat('] ', data[1].title).slice(0,20)}..`} />
                  : <ListItemText primary={`[${data[1].subject}] ${data[1].title}`} /> }
              </ListItemLink>
            )) }   
          </List>
          </div>
          }
          {checkNew && <Button className='newButton' onClick={checkNewNotice} variant="outlined" color="primary">확인하셨다면 눌러주세요!</Button>}
          <div className="img">
          {(!checkNew && !NewNotice) ? <img src={chatbotImg2} className="doraemon_img" /> : <img src={chatbotImg} className="doraemon_img" />}
          </div>
        </div>

      </>
    );
};
  

export default Chatbot;
  
