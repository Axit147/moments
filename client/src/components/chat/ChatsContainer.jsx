import React, { useEffect, useRef, useState } from "react";
import Chats from "./Chats";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { Call, EnterPost } from "../../images/Icons";
import Notification from "./Notification";
import Swal from "sweetalert2";
import Peer from "simple-peer";
import { useNavigate } from "react-router-dom";
import {
  getMyStream,
  removeStream,
  removeUserStream,
  setUserStream,
} from "../../actions/streams";

const ChatsContainer = ({ user, socket, connectionRef }) => {
  const navigate = useNavigate();
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

  const dispatch = useDispatch();

  const [callAccepted, setCallAccepted] = useState(false);
  const [call, setCall] = useState(false);
  const [callEnded, setCallEnded] = useState(true);

  const answerCall = async (call) => {
    setCallAccepted(true);
    console.log(call);

    const stream = await dispatch(getMyStream());

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.callerId });
    });

    peer.on("stream", (currentStream) => {
      dispatch(setUserStream(currentStream));
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    setCallEnded(false);

    peer.on("close", () => {
      dispatch(removeStream());
      dispatch(removeUserStream());
      socket.removeAllListeners("callUser");
    });
  };

  const callUser = async () => {
    const stream = await dispatch(getMyStream());
    const peer = await new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        recieverId: recieverId,
        callerId: senderId,
        callerName: user.name,
        signal: data,
      });
    });

    peer.on("stream", (currentStream) => {
      dispatch(setUserStream(currentStream));
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;

    peer.on("close", () => {
      dispatch(removeStream());
      dispatch(removeUserStream());
      socket.removeAllListeners("callUser");
    });

    setCallEnded(false);
  };

  const leaveCall = () => {
    try {
      // dispatch(removeStream());
      // setCallAccepted(false);
      // setCallEnded(true);
      socket.emit("callEnded", {
        senderId,
        recieverId: call ? call.callerId : recieverId,
        callEnderName: user.name,
      });
      connectionRef.current.destroy();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user && socket.emit("newUser", user?._id);
  }, [socket, user]);

  useEffect(() => {
    setSenderId(user?._id);

    socket.on("notification", async (data) => {
      console.log(data);
      setNotifications((prev) => [data, ...prev]);
    });

    socket.on("incomingCall", (data) => {
      setCall(data);
      Swal.fire({
        title: `${data.callerName} is calling`,
        showDenyButton: true,
        confirmButtonText: "Answer",
        denyButtonText: `Decline`,
        toast: true,
        position: "top",
        timer: 20000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          answerCall(data);
        } else if (result.isDenied) {
          socket.emit("callDeclined", {
            callerName: data.callerName,
            callerId: data.callerId,
            userName: user.name,
          });
        } else if (result.isDismissed) {
          socket.emit("callDeclined", {
            callerName: data.callerName,
            callerId: data.callerId,
            userName: user.name,
          });
        }
      });
    });

    socket.on("callEnded", (callEnderName) => {
      callEnderName &&
        Swal.fire({
          title: `${callEnderName} ended the call!`,
          icon: "info",
          confirmButtonText: "Ok",
        });
      setCallEnded(true);
    });
  }, []);

  useEffect(() => {
    socket.on("callDeclined", async (name) => {
      Swal.fire({
        title: `${name} declined your call!`,
        icon: "warning",
        confirmButtonText: "Ok",
      });
      dispatch(removeStream());
      setCallEnded(true);
    });
  }, [dispatch]);

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
      className={`fixed bottom-2 z-50 border-double border-4 shadow-xl hover:shadow-2xl duration-200 p-4 bg-white/70 backdrop-blur-lg rounded-xl w-full max-w-[450px]`}
      ref={chatsRef}
    >
      <header className="text-center font-semibold text-lg flex justify-center items-center chatsHeader">
        {!callEnded && (
          <button
            onClick={leaveCall}
            className="p-1.5 bg-red-500 rounded-full text-white"
          >
            <Call />
          </button>
        )}
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
        <div className={`min-h-0 max-h-[80vh] overflow-auto`}>
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
              callUser={callUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsContainer;
