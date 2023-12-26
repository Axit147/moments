import * as api from "../api/index";

export const fetchNotis = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchNotis(userId);
    dispatch({ type: "FETCH_NOTIS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const sendNotification = (notification) => async (dispatch) => {
  try {
    const { data } = await api.sendNotification(notification);
    dispatch({ type: "SEND_NOTI", payload: data });
  } catch (error) {
    console.log(error);
  }
};
