export default (notifications = [], action) => {
  switch (action.type) {
    case "FETCH_NOTIS":
      return action.payload;

    default:
      return notifications;
  }
};
