import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import ViteExpress from "vite-express";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {
  const name = client.handshake.query?.name;
  console.log(`${name}님이 들어옴`);
  //메시지 수진
  client.on("message", (data) => {
    console.log("보낸 사용자 : ", name);
    console.log(data);
    io.emit("message", {
      name: data.name,
      message: data.message,
    });
  });

  client.broadcast.emit("message", {
    name: "관리자",
    message: `${name}님이 방에 입장하셨습니다.`,
  });
  //연결 해제
  client.on("disconnect", () => {
    console.log(`${name}님이 나감`);
    io.emit("message", {
      name: "관리자",
      message: `${name}님이 방에서 나가셨습니다.`,
    });
  });
});

httpServer.listen(3000, () => {
  console.log("::::소켓 서버 작동::::\nPort >>> 3000");
});

app.get("/message", (_, res) => res.send("Hello from express!"));
app.get("/api", (_, res) => {
  res.send("Hello from api");
});

ViteExpress.bind(app, httpServer);
