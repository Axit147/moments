export default (chats = {}, action) => {
  switch (action.type) {
    case "SAVE_CHAT":
      return { ...chats, messages: [chats.messages, action.payload] };

    case "FETCH_CHAT":
      return action.payload;

    default:
      return chats;
  }
};
