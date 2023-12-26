import React, { useState, useEffect } from "react";
import Form from "./Form";
import Posts from "./Posts/Posts";
import { useDispatch } from "react-redux";
import { getUsers } from "../actions/users";
import ChatsContainer from "./chat/ChatsContainer";
import { fetchNotis } from "../actions/notifications";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  useEffect(() => {
    dispatch(getUsers());
    dispatch(fetchNotis(user?._id));
  }, [dispatch, user]);

  return (
    <div className="flex flex-col gap-5 w-full justify-around items-center">
      <Form currentId={currentId} setCurrentId={setCurrentId} />
      <Posts user={user} currentId={currentId} setCurrentId={setCurrentId} />
      {user && <ChatsContainer user={user} />}
    </div>
  );
};

export default Home;
