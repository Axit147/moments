import React, { useState, useEffect, useRef } from "react";
import Form from "./Form";
import Posts from "./Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/users";
import ChatsContainer from "./chat/ChatsContainer";
import { fetchNotis } from "../actions/notifications";
import ResizableComponent from "./ResizableBox";
import { io } from "socket.io-client";

const Home = () => {
  const socket = io.connect("https://moments-server-q687.onrender.com");
  const [currentId, setCurrentId] = useState(0);
  // const [socket, setSocket] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  const myStream = useSelector((state) => state.myStream);
  let connectionRef = useRef();

  useEffect(() => {
    // const s = io("https://moments-server-q687.onrender.com");
    // setSocket(s);
    dispatch(getUsers());
    dispatch(fetchNotis(user?._id));
  }, [dispatch, user]);

  return (
    <div className="flex flex-col gap-5 w-full justify-around items-center">
      {myStream && <ResizableComponent />}
      <Form currentId={currentId} setCurrentId={setCurrentId} />
      <Posts user={user} currentId={currentId} setCurrentId={setCurrentId} />
      {user && (
        <ChatsContainer
          user={user}
          socket={socket}
          connectionRef={connectionRef}
        />
      )}
    </div>
  );
};

export default Home;
