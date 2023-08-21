import axios from "axios";

const API = axios.create({ baseURL: "https://moments-iota.vercel.app" });

API.interceptors.request.use((req, res) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get(`/posts`);
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
