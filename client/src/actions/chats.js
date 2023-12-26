import * as api from "../api/index";

// export const getChats = (senderId, recieverId) => async (dispatch) => {
//   try {
//     const { data } = await api.fetchChats(senderId, recieverId);
//     dispatch({ type: "FETCH_CHATS", payload: data });
//   } catch (error) {}
// };

export const accessChat = (senderId, recieverId) => async (dispatch) => {
  try {
    const { data } = await api.accessChat(senderId, recieverId);
    dispatch({ type: "FETCH_CHAT", payload: data });
    return data
  } catch (error) {}
};

export const saveChat = (newChat,chatId) => async (dispatch) => {
  try {
    const { data } = await api.saveChat(newChat,chatId);
    dispatch({ type: "SAVE_CHAT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
