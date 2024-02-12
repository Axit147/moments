export const getMyStream = () => async (dispatch) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  dispatch({ type: "SET_MY_STREAM", payload: stream });
  return stream;
};

export const removeStream = () => async (dispatch) => {
  dispatch({ type: "REMOVE_STREAM" });
};

export const removeUserStream = () => async (dispatch) => {
  dispatch({ type: "REMOVE_USER_STREAM" });
};

export const setUserStream = (userStream) => async (dispatch) => {
  dispatch({ type: "SET_USER_STREAM", payload: userStream });
};
