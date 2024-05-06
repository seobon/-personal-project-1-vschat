import "../styles/chat.css";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import OwnerNotice from "../components/OwnerNotice";

export default function Home() {
  const [msgInput, setMsgInput] = useState("");
  const [dmTo, setDmTo] = useState('all');
  const [roomList, setRoomList] = useState([
    {
      roomType: "all",
      roomName: "Home",
    },
  ]);

  const [ownerNotices, setOwnerNotices] = useState([]);

  useEffect(() => {
    const ownerNoticeArray = [
      "안녕하십니까.",
      '저는 VS Chat의 관리자입니다.',
      'VS Chat은 개발자를 위한 채팅 사이트입니다.',
      '회원가입 또는 로그인을 하면 이용할 수 있습니다.',
      '회원가입을 원하면 "signup", 로그인을 원하면 "login"을',
      'INPUT FIELD에 입력하세요.'
    ];

    const timer = setInterval(() => {
      if (ownerNotices.length < ownerNoticeArray.length) {
        setOwnerNotices((prevOwnerNotices) => [...prevOwnerNotices, ownerNoticeArray[ownerNotices.length]]);
      } else {
        clearInterval(timer);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [ownerNotices]);

  const checkMsg = () => {
    let redirectUrl;
    if (msgInput == "signup") {
      // redirectUrl = `${process.env.REACT_APP_DB_HOST}signup`;
      redirectUrl = `http://localhost:3000/signup`;
    } else if (msgInput == "login") {
      // redirectUrl = `${process.env.REACT_APP_DB_HOST}login`;
      redirectUrl = `http://localhost:3000/login`;
    } else {
      redirectUrl = `http://localhost:3000/404`
    }
    window.location.href = redirectUrl;
  };

  return (
    <>
      <header className="header">
        {roomList.map((room, i) => {
            return <Header key={i} room={room}/>;
          })}
      </header>
      <div className="backgrond">
          <>
            <div className="sentence">
            {ownerNotices.map((message, index) => (
              <OwnerNotice key={index} message={message}/>
            ))}
              <div className="terminar-container">
                <div value={dmTo} onChange={(e) => setDmTo(e.target.value)}>
                  <button value="all" className="terminar-button">Home</button>
                </div>
                <div className="terminarPart">INPUT FIELD</div>
                <div className="input-container">
                  <span className="pathPart">C:\Hey\Users\Enter\Your\Message&gt;</span>
                  <span className="commandPart"> here </span>
                  <input
                    placeholder="Write\Your\Message\"
                    type="text"
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        checkMsg();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </>
      </div>
    </>
  );
}