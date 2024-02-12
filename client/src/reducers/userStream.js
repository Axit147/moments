export default (userStream = null, action) => {
  switch (action.type) {
    case "SET_USER_STREAM":
      return action.payload;
    case "REMOVE_USER_STREAM":
      return null;
    default:
      return userStream;
  }
};
