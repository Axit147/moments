import { combineReducers } from "redux";

import posts from "./posts";
import authReducer from "./auth";
import users from "./users";
import chats from "./chats";
import existingChats from "./existingChats";
import notifications from "./notifications";
import myStream from "./myStream";
import userStream from "./userStream";

export default combineReducers({
  posts,
  authReducer,
  users,
  chats,
  existingChats,
  notifications,
  myStream,
  userStream,
});
