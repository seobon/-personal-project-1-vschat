const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const port = 8000;

// const multer = require("multer");
// const session = require("express-session");

const cors = require("cors");
app.use(cors({origin: true, credentials: true}));

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const router = require("./routes");
app.use("/", router);

app.get("/", (req, res) => {
    res.send({ message: "server client connections" });
});

app.get("*", function (req, res) {
    res.send("404");
});



io.on("connection", (socket) => {
    console.log("socket id", socket.id)

    socket.on("entry", (res) => {
      io.emit("entrySuccess", { userId: res.userId });
    });
});

server.listen(port, function () {
    console.log(`Server open : ${port}` );
});