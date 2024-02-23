import React from "react";
import {
  LikeFill,
  LikeOutline,
  Delete,
  More,
  EnterPost,
} from "../../images/Icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../actions/posts";
import { Link } from "react-router-dom";

function Post({ post, currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <LikeFill />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1}others`
            : [post.likes.length === 2 ? "You and 1 other" : "Liked by You"]}
        </>
      ) : (
        <>
          <LikeOutline />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <LikeOutline />
        &nbsp;Like
      </>
    );
  };

  return (
    <Link to={`/post/${post._id}`} className="grow">
      <div className="bg-whit overflow-hidden rounded-xl h-full flex flex-col min-h-[30rem] shadow-xl hover:shadow-lg hover:scale-[0.99] active:shadow duration-200">
        <div className="relative">
          <img
            src={post.selectedFile}
            alt={post.title}
            className="z-100 w-full object-cover h-[15rem]"
          />

          <section className="absolute top-0 left-0 bg-gradient-to-b from-black/60 w-full h-full text-white p-2 rounded-md">
            {user?.result?._id === post?.creator && (
              <a
                href="#form"
                onClick={() => {
                  setCurrentId(post._id);
                }}
                className="absolute p-1 top-2 right-2 hover:bg-[rgba(0,0,0,0.2)] duration-300 rounded-full"
              >
                <More />
              </a>
            )}
            <p className="text-2xl font-bold">{post.name}</p>
            <p>{moment(post.createdAt).fromNow()}</p>
          </section>
        </div>
        <div className="flex flex-col justify-between grow pb-3">
          <Link to={`/post/${post._id}`} className="grow">
            <div className="relative duration-300 h-full">
              <div className="active:scale-80 absolute opacity-0 hover:opacity-100 w-full h-full bg-[rgba(0,0,0,0.1)] shadow-0 duration-300 text-white backdrop-blur-sm">
                <div className="w-[200%] h-full translate-x-[-50%] hover:translate-x-0 duration-500">
                  <EnterPost />
                </div>
              </div>

              <div className="p-3">
                <div className="mb-3">
                  {post.tags.length &&
                    post.tags.map((tag) => {
                      return (
                        <p key={tag} className="text-gray-500 px-1 inline">
                          {tag !== "" && tag !== " " && `#${tag}`}
                        </p>
                      );
                    })}
                </div>
                <p className="px-4 mb-2 font-semibold text-2xl m-0 text-gray-600 h-min">
                  {post.title}
                </p>
                <p className="px-4 mb-2 text-md text-gray-600 min-h-min grow min-content">
                  {post.message}
                </p>
              </div>
            </div>
          </Link>
          <div className="w-full relative mb-3 mt-6 h-5">
            <button
              disabled={!user?.result}
              onClick={() => dispatch(likePost(post._id))}
              className={`absolute top-[50%] translate-y-[-50%] left-0 flex flex-row ${
                !user?.result ? "text-gray-400" : "text-blue-600"
              } font-semibold mx-6`}
            >
              <Likes />
            </button>
            {user?.result?._id === post?.creator && (
              <button
                onClick={() => dispatch(deletePost(post._id))}
                className={`hover:text-red-600/80 duration-300 absolute top-[50%] translate-y-[-50%] right-0 flex flex-row align-center text-red-600 font-semibold mx-6`}
              >
                <Delete />
                &nbsp;<span className="">Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
