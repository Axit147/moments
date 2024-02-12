export default (myStream = null, action) => {
  switch (action.type) {
    case "SET_MY_STREAM":
      myStream = action.payload;
      return action.payload;
    case "REMOVE_STREAM":
      myStream.getTracks().forEach((track) => {
        track.stop();
      });
      return null;

    default:
      return myStream;
  }
};
