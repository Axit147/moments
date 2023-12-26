import axios from "axios";

// const API = axios.create({ baseURL: "https://moments-iota.vercel.app" });
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req, res) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?p=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post(`/posts`, newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const login = (formData) => API.post(`/users/login`, formData);
export const signUp = (formData) => API.post(`/users/signup`, formData);

export const fetchUsers = () => API.get(`/users/getUsers`);

export const getChats = (id) => API.get(`/chats/${id}`);
export const saveChat = (newChat, chatId) =>
  API.post(`/chats/saveChat/${chatId}`, newChat);
export const accessChat = (senderId, recieverId) =>
  API.post(`/chats/with`, { senderId: senderId, recieverId: recieverId });

export const fetchNotis = (userId) => API.get(`/notification/${userId}`);
export const sendNotification = (notification) =>
  API.post(`/notification/`, notification);

export const deleteNotification = (senderId, recieverId) =>
  API.delete(`/notification/${senderId}&${recieverId}`);
