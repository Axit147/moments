export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;

    case "FETCH_POST":
      return action.payload;

    case "CRAETE":
      return [...posts, action.payload];

    case "UPDATE":
    case "LIKE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case "COMMENT":
      const newPosts = posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });

      return newPosts;
    // return {
    //   posts: posts?.map((post) => {
    //     if (post._id === action.payload._id) return action.payload;

    //     return post;
    //   }),
    // };

    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
};
