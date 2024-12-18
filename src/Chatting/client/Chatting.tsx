import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import * as S from "./styled";

const Chatting = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [socket, setSocket] = useState<any>(null);
  const [name, setName] = useState("");
  const [isConnectState, setIsConnectState] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<{ name: string; message: string }[]>(
    []
  );
  const chatRef = useRef<HTMLDivElement | null>(null);
  const connectChatServer = () => {
    console.log("connect chat server");
    const _socket = io("localhost:3000", {
      autoConnect: false,
      query: {
        name,
      },
    });
    _socket.connect();
    setSocket(_socket);
  };

  const disConnectChatServer = () => {
    console.log("disconnect chat server");
    socket?.disconnect();
  };

  const onChangeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setName(e.target.value);
  };

  const onConnectHandler = () => {
    //소케 서버 연결
    setIsConnectState(true);
  };

  const onDisconnectHandler = () => {
    //소켓 서버 연결 해제
    setIsConnectState(false);
  };

  const onChangeMessageHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setInputMessage(e.target.value);
  };

  //메시지 보냄
  const sendMessageHandler = () => {
    if (!isConnectState) {
      console.log("접속이 필요합니다.");
      return;
    }
    console.log(`메시지를 보냅니다. ${inputMessage}`);
    socket?.emit(
      "message",
      { name: name, message: inputMessage },
      (res: string) => {
        console.log(res);
      }
    );
  };

  //받은 메시지 처리
  const messageReceived = (data: { name: string; message: string }) => {
    setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket?.on("connect", onConnectHandler);
    socket?.on("disconnect", onDisconnectHandler);
    socket?.on("message", messageReceived);
    return () => {
      socket?.off("connect", onConnectHandler);
      socket?.off("disconnect", onDisconnectHandler);
      socket?.off("message", messageReceived);
    };
  }, [socket]);

  return (
    <>
      <h1>채팅 페이지</h1>
      <input type="text" value={name} onChange={onChangeNameHandler} />
      <div>
        <p>유저 : {name}</p>
      </div>
      <div>접속 상태 : {isConnectState ? "접속" : "접속 필요"}</div>
      <button onClick={connectChatServer}>채팅 연결</button>
      <button onClick={disConnectChatServer}>채팅 연결 해제</button>

      <S.ChatContainer ref={chatRef}>
        <ul>
          {messages.map((message, idx) => {
            return (
              <li key={idx}>
                {message.name} : {message.message}
              </li>
            );
          })}
        </ul>
      </S.ChatContainer>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={onChangeMessageHandler}
        />
        <button onClick={sendMessageHandler}>전송</button>
      </div>
    </>
  );
};

export default Chatting;
