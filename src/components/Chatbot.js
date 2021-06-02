import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { HashRouter as Route } from "react-router-dom";
import chatbotImg from "../images/doraemon.png";
import "./Chatbot.css";

const Chatbot = () => {
    return (
      <>
        <div className="chatbot">
        <img
          src={chatbotImg}
        />
        </div>
      </>
    );
};
  

export default Chatbot;
  
