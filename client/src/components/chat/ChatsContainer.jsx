import React, { useEffect, useRef, useState } from "react";
import Chats from "./Chats";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { EnterPost } from "../../images/Icons";
import { io } from "socket.io-client";
import Notification from "./Notification";

const ChatsContainer = ({ user }) => {
  // const socket = io.connect("http://localhost:5000");
  const socket = io.connect("https://moments-bcag.vercel.app");
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [recieverId, setRecieverId] = useState("");
  const [chatName, setChatName] = useState("");

  const notification = useSelector((state) => state.notifications);
  const [notifications, setNotifications] = useState(notification);

  const users = useSelector((state) => state.users);

  const [oldChats, setOldChats] = useState([]);
  const [chatId, setChatId] = useState("");

  const [loading, setLoading] = useState(false);
  const [senderId, setSenderId] = useState(user._id);
  let chatsRef = useRef();

  useEffect(() => {
    user && socket.emit("newUser", user?._id);
  }, [socket, user]);

  useEffect(() => {
    setSenderId(user?._id);
    socket.on("notification", async (data) => {
      console.log(data);
      setNotifications((prev) => [data, ...prev]);
    });
  }, []);

  useEffect(() => {
    setNotifications(notification);
  }, [notification]);

  useEffect(() => {
    const handler = (e) => {
      if (!chatsRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      className={`fixed bottom-2 z-50 border-double border-4 shadow-xl hover:shadow-2xl duration-200 p-4 bg-white rounded-xl w-full max-w-[450px]`}
      ref={chatsRef}
    >
      <header className="text-center font-semibold text-lg flex justify-center items-center chatsHeader">
        <div
          className="grow flex justify-center items-center overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`w-14 translate-y-3 duration-300 mx-5 ${
              isOpen ? "revChatsArrow" : "chatsArrow"
            }`}
          >
            <EnterPost />
          </div>
          <p>Chats</p>
          <div
            className={`w-14 translate-y-3 duration-300 mx-5 ${
              isOpen ? "revChatsArrow" : "chatsArrow"
            }`}
          >
            <EnterPost />
          </div>
        </div>
        {!isOpen && <Notification notifications={notifications} />}
      </header>
      <div className={`wrapper ${isOpen ? "open" : ""} duration-200`}>
        <div className={`bg-white min-h-0 max-h-[80vh] overflow-auto`}>
          {!showChat ? (
            <Chats
              setLoading={setLoading}
              setChatId={setChatId}
              setOldChats={setOldChats}
              users={users}
              setShowChat={setShowChat}
              setRecieverId={setRecieverId}
              setChatName={setChatName}
              senderId={senderId}
              user={user}
              isOpen={isOpen}
            />
          ) : (
            <Chat
              loading={loading}
              chatId={chatId}
              oldChats={oldChats}
              setOldChats={setOldChats}
              senderId={senderId}
              setRecieverId={setRecieverId}
              setShowChat={setShowChat}
              recieverId={recieverId}
              chatName={chatName}
              setChatId={setChatId}
              socket={socket}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsContainer;
