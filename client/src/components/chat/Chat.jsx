import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveChat } from "../../actions/chats";
import Loader from "../loader";
import { sendNotification } from "../../actions/notifications";
import moment from "moment";
import Lottie from "lottie-react";
import Typing from "../../images/Typing.json";
import { Back } from "../../images/Icons";

const Chat = ({
  senderId,
  recieverId,
  setShowChat,
  chatName,
  oldChats,
  setOldChats,
  loading,
  chatId,
  setChatId,
  socket,
  user,
}) => {
  const dispatch = useDispatch();

  const scrollRef = useRef();
  const chatRef = useRef();

  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState({
    senderId: senderId,
    recieverId: recieverId,
    content: "",
    time: "",
  });

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!(message === "")) {
      dispatch(saveChat(messageData, chatId));
      dispatch(
        sendNotification({
          sender: senderId,
          from: user.name,
          reciever: recieverId,
        })
      );

      socket.emit("sendMsg", chatId, messageData, user?.name);

      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      setMessage("");

      // setIsTyping(false);
      socket.emit("stopTyping", chatId);

      return;
    }
  };

  // DEBOUNCE

  const [timeout, settimeout] = useState();

  function debounce(cb, delay) {
    if (timeout) {
      clearTimeout(timeout);
    }
    settimeout(setTimeout(cb, delay));
  }

  const changeHandler = (e) => {
    setMessage(e.target.value);
    setMessageData({
      ...messageData,
      content: e.target.value,
      time: Date.now(),
    });

    if (!isTyping) {
      // setIsTyping(true);
      socket.emit("istyping", chatId);
    }

    debounce(() => {
      // setIsTyping(false);
      socket.emit("isNotTyping", chatId);
    }, 1000);
  };

  useEffect(() => {
    socket.emit("join room", chatId);

    socket.on("recievedMsg", async (msg) => {
      msg._id = Math.random();
      await setOldChats((oldChats) => [...oldChats, msg]);
      return;
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [loading, oldChats]);

  return (
    <div className="flex flex-col h-full relative min-h-[80vh]">
      <nav className="flex w-full gap-4 border-b p-3 items-center shadow-lg">
        <button
          onClick={() => {
            setShowChat(false);
            socket.emit("leave room", chatId);
            setChatId("");
          }}
          className="bg-gray-100 hover:opacity-80 p-1 rounded-full hover:scale-105 font-bold shadow-md text-xsm duration-200"
        >
          <Back />
        </button>
        <h1 className="font-semibold text-lg px-3">{chatName}</h1>
      </nav>
      <div
        ref={chatRef}
        className="overflow-y-auto overflow-hidden grow mb-12 pb-10 pr-1"
      >
        {!loading ? (
          <div>
            {oldChats?.map((item) => {
              return (
                <div className="relative">
                  <div
                    className={`relative px-3 py-2 my-2 mb-0 max-w-[70%] w-max rounded-md ${
                      item?.senderId === senderId
                        ? "ml-auto bg-blue-100 border-e-4 border-blue-300"
                        : "bg-red-100 border-s-4 border-red-300"
                    }`}
                    key={item._id}
                  >
                    <p>{item?.content}</p>
                  </div>
                  {item?.senderId === senderId ? (
                    <p className="text-xs mt-0 mb-1 text-gray-500 text-right">
                      {moment(item?.time).calendar()}
                    </p>
                  ) : (
                    <p className="text-xs mt-0 mb-1 text-gray-500">
                      {moment(item?.time).calendar()}
                    </p>
                  )}
                </div>
              );
            })}
            {isTyping && (
              <span className="fixed bottom-[4.5rem]">
                <Lottie animationData={Typing} style={{ width: 100 }} />
              </span>
            )}
          </div>
        ) : (
          <div className="flex h-full justify-center items-center">
            <Loader />
          </div>
        )}
        <div ref={scrollRef} className=""></div>
      </div>
      <form
        action=""
        className="absolute bottom-0 z-10 flex w-full border rounded-md overflow-hidden mt-5"
      >
        <input
          type="text"
          className="grow outline-none p-3"
          value={message}
          onChange={(e) => {
            changeHandler(e);
          }}
        />
        <button
          className="p-3 bg-sky-600 hover:opacity-80 text-white duration-200"
          onClick={sendMessage}
        >
          send
        </button>
      </form>
    </div>
  );
};

export default Chat;
