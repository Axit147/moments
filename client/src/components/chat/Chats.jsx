import React, { useEffect, useState } from "react";
import { EnterPost } from "../../images/Icons";
import { useDispatch, useSelector } from "react-redux";
import { accessChat } from "../../actions/chats";
import Loader from "../loader";
import { getChats } from "../../actions/existingChats";
import moment from "moment";
import { fetchNotis } from "../../actions/notifications";

const Chats = ({
  users,
  setShowChat,
  setRecieverId,
  setChatName,
  senderId,
  setOldChats,
  setLoading,
  setChatId,
  user,
  isOpen,
}) => {
  const [searchedUser, setSearchedUser] = useState("");
  const [searchedUserList, setSearchedUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const [notiSenders, setNotiSenders] = useState([]);
  const existingChats = useSelector((state) => state.existingChats);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotis(user?._id));
  }, [dispatch, isOpen]);

  useEffect(() => {
    setNotiSenders(notifications.map((n) => n.sender));
  }, [notifications]);

  useEffect(() => {
    // setChatId("");

    setIsLoading(true);

    senderId && dispatch(getChats(senderId));

    setIsLoading(false);
  }, [senderId, dispatch]);

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(existingChats);
    setSearchedUserList(
      users?.filter((user) =>
        user.name.toLowerCase().includes(searchedUser.toLowerCase())
      )
    );
  };

  const changeHandler = (e) => {
    setSearchedUser(e.target.value);
    setSearchedUserList(
      users?.filter((user) =>
        user.name.toLowerCase().includes(searchedUser.toLowerCase())
      )
    );
    if (e.target.value === "") setSearchedUserList([]);
  };

  return (
    <div className="min-h-[77vh]">
      <form
        action=""
        className="sticky top-0 z-10 flex w-full border rounded-md overflow-hidden mt-5"
      >
        <input
          type="text"
          name=""
          className="grow outline-none p-3"
          onChange={changeHandler}
        />
        <button
          className="p-3 bg-green-600 hover:bg-green-600/80 text-white duration-200"
          type="submit"
          onClick={searchHandler}
        >
          search
        </button>
      </form>

      <div className={`mb-5 p-2`}>
        {!isLoading ? (
          searchedUser.length ? (
            searchedUserList.length ? (
              searchedUserList.map((user) => (
                <button
                  key={user._id}
                  className="block border-b w-full p-2 text-left"
                  onClick={async () => {
                    setLoading(true);
                    setRecieverId(user._id);
                    setChatName(user.name);
                    const response = dispatch(accessChat(senderId, user._id));
                    setChatId(response._id);
                    setLoading(false);
                    setShowChat(true);
                  }}
                >
                  <div className="">{user.name}</div>
                  <div className="text-[12px] text-gray-400">{user.email}</div>
                </button>
              ))
            ) : (
              <div className="font-semobold">No Results Found</div>
            )
          ) : null
        ) : (
          <Loader />
        )}
      </div>

      <p className="mb-3 font-medium tracking-wider underline underline-offset-2 hover:underline-offset-4 duration-200">
        Recent Chats
      </p>
      <div className="grid grid-cols-1 divide-y">
        {existingChats?.length &&
          existingChats?.map((chat) => {
            const userId = chat?.users?.find((id) => id !== senderId);
            const user = users?.find((user) => user._id === userId);
            const isAlsoSender = notiSenders.find((id) => id === user?._id);
            return (
              <section
                key={user?._id}
                className="p-3 relative overflow-hidden"
                onClick={async () => {
                  setLoading(true);
                  setRecieverId(user?._id);
                  setChatName(user?.name);
                  const response = await dispatch(
                    accessChat(senderId, user._id)
                  );
                  setOldChats(response?.messages);
                  setChatId(response?._id);
                  setShowChat(true);
                  setLoading(false);
                }}
              >
                <div className="active:scale-80 absolute top-0 left-0 opacity-0 hover:opacity-100 w-full h-full bg-[rgba(0,0,0,0.1)] shadow-0 duration-300 text-white backdrop-blur-sm">
                  <div className="w-[200%] h-full translate-x-[-50%] hover:translate-x-0 duration-500">
                    <EnterPost />
                  </div>
                </div>

                <div className="">{user?.name}</div>
                <div className="text-[12px] font-light tracking-widest flex flex-row justify-between items-center">
                  <p>{user?.email}</p>
                  <span
                    className={`${
                      isAlsoSender ? "font-bold" : ""
                    } flex items-center gap-1`}
                  >
                    {isAlsoSender && (
                      <p className="h-2 w-2 rounded-full bg-red-500 text-center text-xs text-white"></p>
                    )}
                    {moment(chat.updatedAt).fromNow()}
                  </span>
                </div>
              </section>
            );
          })}
      </div>
    </div>
  );
};

export default Chats;
