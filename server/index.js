import express from "express";
import { createServer } from "node:http";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import chatsRoutes from "./routes/chats.js";
import notificationRouts from "./routes/notifications.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    //origin: "http://localhost:3000",
    origin: "https://moments-bcag.vercel.app/"
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/chats", chatsRoutes);
app.use("/notification", notificationRouts);

let onlineUsers = [];

const addNewUser = (sender, socketId) => {
  !onlineUsers.some((user) => user.userId === sender) &&
    onlineUsers.push({ sender, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.sender === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId, name) => {
    addNewUser(userId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
  });

  socket.on("join room", (room) => {
    socket.join(room);
    console.log("user joined room", room);
  });

  socket.on("leave room", (room) => {
    socket.leave(room);
  });

  socket.on("sendMsg", (roomId, chat, name) => {
    io.to(roomId).emit("recievedMsg", chat);
    let reciever = getUser(chat.recieverId);
    io.to(reciever?.socketId).emit("notification", {
      from: name,
      updatedAt: Date.now(),
    });
  });

  socket.on("istyping", (roomId) => {
    socket.to(roomId).emit("typing");
  });
  socket.on("isNotTyping", (roomId) => {
    socket.to(roomId).emit("stopTyping");
  });
});

const CONNECTION_URL =
  "mongodb+srv://axitthummar4:axitthu147@cluster0.qiirm9r.mongodb.net/?retryWrites=true&w=majority";
const PORT = https://moments-iota.vercel.app/ || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen(PORT, () => console.log("server is running")))
  .catch((err) => console.log(err.message));

// mongoose.set("useFindAndModify", false);
