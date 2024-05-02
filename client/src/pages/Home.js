import "../styles/chat.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import Chat from "../components/Chat";
import Notice from "../components/Notice";
import io from "socket.io-client";
import Header from "../components/Header";
import OwnerNotice from "../components/OwnerNotice";

const socket = io.connect("http://localhost:8000", { autoConnect: false });
export default function SBProjectChat() {
  const [msgInput, setMsgInput] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [chatList, setChatList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userList, setUserList] = useState({});
  const [dmTo, setDmTo] = useState('all');
  const [roomList, setRoomList] = useState([
    {
      roomType: "all",
      roomName: "ALL",
    },
  ]);



  const [ownerNotice, setOwnerNotice] = useState({});

  // const welcome = () => {
  //   // setOwnerNotice("환영합니다.")
  //   // console.log("환영합니다.");
  //   const addOwnerNotice = 
  //     { "환영합니다.", "환영합니다.", "환영합니다.", "환영합니다."};
  //     setOwnerNotice(addOwnerNotice);
  // };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageArray = [
      '환영합니다! 어서오세요!',
      '두 번째 환영 메시지입니다!',
      '세 번째 환영 메시지입니다!',
      '네 번째 환영 메시지입니다!',
      '다섯 번째 환영 메시지입니다!'
    ];

    const timer = setInterval(() => {
      if (messages.length < messageArray.length) {
        setMessages((prevMessages) => [...prevMessages, messageArray[messages.length]]);
      } else {
        clearInterval(timer);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [messages]);






  const entryChat = () => {
    initSocketConnect();
    socket.emit("entry", { userId: userIdInput });
  };

  const initSocketConnect = () => {
    console.log("connected", socket.connected);
    if (!socket.connected) socket.connect();
  };

  useEffect(() => {
    socket.on("entrySuccess", (res) => {
      console.log("여기까지", res.userId)
      setUserId(res.userId);
    });

    socket.on("error", (res) => {
      alert(res.msg);
    });

    socket.on("userList", (res) => {
      setUserList(res);
    })
  }, []);

  // useMemo: 값을 메모라이징 한다.
  // 뒤에 있는 의존성 배열에 있는 값이 update 될 때마다 연산을 실행함.
  const userListOptions = useMemo(() => {
    // [<option></option>, <option></option>]
    // off를 쓰면 뒤에 배열이 왔는데 in을 쓰면 뒤에 객체가 온다.
    const options = [];
    for(const key in userList) {
      // key : userList의 key값 (socket id)
      // userList[key] -> 이렇게 하면 userList의 value를 가져올 수 있다. (사용자 id)
      if (userList[key] === userId) continue;
      options.push(<button key={key} value={key} className="terminar-button" onClick={(e) => {setRoomList([
        ...roomList,
        {
          roomType: "dm",
          roomName: userList[key],
        },
      ])
      setDmTo(e.target.value);
      createRoom();

    }}>{userList[key]}</button>)
    }
    return options
  }, [userList])

  // useCallback : 함수를 메모라이징한다.
  // 리액트 자체는 랜더링되는 순간, 선언된 함수를 만나면 계속 새로 선언한다.
  // 그래서 함수를 원하는 순간에만 업데이트 하기 위해 사용한다.
  // 그 순간은 뒤에 나오는 의존성 배열에 있는 값이 업데이트 되는 순간이다.
  const addChatList = useCallback(
    (res) => {
      const type = res.userId === userId ? "my" : "other";
      const content = `${res.msg}`
      const isDM = `${res.dm ? "dm" : "toAll"}`
      const newChatList = [
        ...chatList,
        { type: type, userId: res.userId, content: content, isDM: isDM },
      ];
      setChatList(newChatList);
    },
    [userId, chatList]
  );

  useEffect(() => {
    socket.on("chat", addChatList);
    return () => socket.off("chat", addChatList);
  }, [addChatList])
  



  useEffect(() => {
    const notice = (res) => {
      const newChatList = [...chatList, { type: "notice", content: res.msg }];
      setChatList(newChatList);
    };

    socket.on("notice", notice);
    return () => socket.off("notice", notice);
  }, [chatList]);

  const sendMsg = () => {
    if (msgInput !== "") {
      socket.emit("sendMsg", { userId: userId, msg: msgInput, dm: dmTo });
      setMsgInput("");
    }
  };
  
  const createRoom = () => {
    socket.emit("joinRoom", { roomName: "roomA" })
  };



  const check = () => {
    console.log("check");
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
            {messages.map((message, index) => (
              <OwnerNotice key={index} message={message}/>
            ))}
              
            
              <div className="chat-container">
                {chatList.map((chat, i) => {
                  if (chat.type === "notice") return <Notice key={i} chat={chat} />;
                  else return <Chat key={i} chat={chat} />;
                })}
              </div>
              <div className="terminar-container">
                <div value={dmTo} onChange={(e) => setDmTo(e.target.value)}>
                  <button value="all" className="terminar-button">ALL</button>
                  {userListOptions}
                </div>
                <div className="terminarPart">INPUT FIELD</div>
                <div className="input-container">
                  <span className="pathPart">C:\Hey\Users\Enter\your\message&gt;</span>
                  <button className="commandPart" onClick={sendMsg}> here </button>
                  <input
                    placeholder="Write\your\message\"
                    type="text"
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMsg();
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