import * as api from "../api/index";

export const getChats = (id) => async (dispatch) => {
  try {
    const { data } = await api.getChats(id);
    dispatch({ type: "FETCH_CHATS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
