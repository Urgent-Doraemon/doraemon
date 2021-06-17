import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { HashRouter as Route } from "react-router-dom";
import { useEffect, useState } from "react";
import chatbotImg from "../images/doraemon.png";
import chatbotImg2 from "../images/doraemon2.png";
import "./Chatbot.css";
import { dbService, firebaseInstance } from "../fbase";
import { AddAlertOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

const Chatbot = () => {
  const subjectList = [
    "데이터과학",
    "인간과 컴퓨터 상호작용",
    "최신컴퓨터특강",
  ];
  const [checkNew, setcheckNew] = useState(false);
  const [NewNotice, setNewNotice] = useState(false); // 기본은 false! 나는 테스트 해보려고 true로 한거야
  const [newNoticeData, setNewNoticeData] = useState();

  const clickChatbot = () => {
    setcheckNew(true);
    setNewNotice(false);
  };

  const closeChatBot = () => {
    setcheckNew(false);
    setNewNotice(true);
  };

  const checkNewNotice = () => {
    setcheckNew(false);
    setNewNotice(false);
  };

  useEffect(async () => {
    const newData = [];
    subjectList.forEach((subject) => {
      dbService
        .collection(subject)
        .where("check", "==", false)
        .get()
        .then((querySnapshot) => {
          if (!NewNotice && !querySnapshot.empty) setNewNotice(true);
          querySnapshot.forEach((doc) => {
            newData[doc.id] = doc.data();
            newData[doc.id]["subject"] = subject;
          });
        });
    });
    setNewNoticeData(newData);
  }, []);

  return (
    <>
      <div className="chatbot">
        {/* console.log(newNoticeData) /* DEBUG */}
        {!checkNew && NewNotice && (
          <Button
            className="newButton openBtn"
            onClick={clickChatbot}
            variant="outlined"
            color="primary"
          >
            새로운 공지가 있어요!
          </Button>
        )}
        {checkNew && (
          <div className={Chatbot.root} id="chatList">
            <div className="listHeader">
              <p>📌 공지사항</p>
            </div>
            <div className="navList">
              <List component="nav" aria-label="main mailbox folders">
                {Object.entries(newNoticeData).map((data) => (
                  <ListItemLink
                    href={
                      `#class?${data[1].subject}?post=${data[0]}` /* _target 지움 */
                    }
                  >
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    {data[1].subject.length + data[1].title.length > 20 ? (
                      <ListItemText
                        primary={`[${data[1].subject
                          .concat("] ", data[1].title)
                          .slice(0, 20)}..`}
                      />
                    ) : (
                      <ListItemText
                        primary={`[${data[1].subject}] ${data[1].title}`}
                      />
                    )}
                  </ListItemLink>
                ))}
              </List>
            </div>
            <Button
              className="newButton"
              onClick={closeChatBot}
              variant="outlined"
              color="primary"
            >
              CLOSE
            </Button>
          </div>
        )}
      
        {!checkNew && (
          <div className="img">
            {!NewNotice ? (
              <img src={chatbotImg2} className="doraemon_img nil" />
            ) : (
              <img src={chatbotImg} className="doraemon_img" />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
