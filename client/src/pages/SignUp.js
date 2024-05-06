import "../styles/chat.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import OwnerNotice from "../components/OwnerNotice";
import CheckField from "../components/CheckField";

export default function SignUp() {
  const [msgInput, setMsgInput] = useState("");
  const [dmTo, setDmTo] = useState('all');
  const [roomList, setRoomList] = useState([
    {
      roomType: "all",
      roomName: "SignUp",
    },
  ]);

  const [ownerNotices, setOwnerNotices] = useState([]);
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");

  useEffect(() => {
    const ownerNoticeArray = [
      "이 곳은 회원가입 페이지입니다.",
      "회원가입을 위해 INPUT FIELD에 아이디를 입력해주세요."
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

  const checkId = () => {
    setIdInput(msgInput);
    setMsgInput("")
  };

  const checkPw = () => {
    setPwInput(msgInput);
    setMsgInput("")
  };
  
  const renderCheckField = (what, message) => {
    if (message !== "") {
      return <CheckField what={what} message={message} />;
    }
    return null;
  };

  const editId = () => {
    // setIdInput(msgInput);
    // setMsgInput("")
    console.log("???")
  };

  const editPw = () => {
    // setPwInput(msgInput);
    // setMsgInput("")
    console.log("!!!")
  };

  const renderInputField = (pathPart, onKeyDown) => {
    return (
        <div className="input-container">
          <span className="pathPart">C:\Hey\Users\Enter\Your\{pathPart}&gt; </span>
          <span className="commandPart"> here </span>
          <input
            placeholder={`Write\\Your\\${pathPart}`}
            type={msgInput === msgInput ? "text" : "password"}
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
    );
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
            ))};
            
              {/* {renderCheckField("id", idInput)}
              {renderCheckField("password", pwInput)} */}

              {idInput !== "" ? (
                  <div>
                    <CheckField what={"id"} message={idInput}/>
                      &lt;
                      <span className="tagPart">button</span>
                      &gt;
                      <button className="marks-button">ID 수정하기</button>
                      &lt;
                      <span className="tagPart">button</span>
                      /&gt;
                  </div>
                ) : (
                  <></>
                )
              }

              {pwInput !== "" ? (
                  <CheckField what={"password"} message={pwInput}/>
                ) : (
                  <></>
                )
              }

              <div className="terminar-container">
                {idInput !== "" ? (
                    <button className="terminar-button" onClick={editId}>EDIT ID</button>
                  ) : (
                    <></>
                  )
                }

                {pwInput !== "" ? (
                    <button className="terminar-button" onClick={editPw}>EDIT PW</button>
                  ) : (
                    <></>
                  )
                }
                
                <div className="terminarPart">INPUT FIELD</div>
                {idInput === ""
                  ? renderInputField(
                      "Id",
                      (e) => {
                        if (e.key === "Enter") {
                          checkId();
                        }
                      }
                    )
                  : renderInputField(
                      "Password",
                      (e) => {
                        if (e.key === "Enter") {
                          checkPw();
                        }
                      }
                    )}
              </div>
            </div>
          </>
      </div>
    </>
  );
}