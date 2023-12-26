import React, { useEffect, useMemo, useState } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import { getPosts } from "../../actions/posts";
import { PlusPage } from "../../images/Icons";

function Posts({ currentId, setCurrentId }) {
  const posts = useSelector((state) => state.posts);

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useMemo(() => {
    setIsLoading(true);
    dispatch(getPosts(page));
    setIsLoading(false);
  }, [dispatch, page]);

  return (
    <div className="w-full max-w-[1200px] mb-40">
      {!posts.length ? (
        <>
          <section className="mx-auto w-fit mb-5">
            <Loader />
          </section>
          <h1 className="text-center">No Memories found...</h1>
        </>
      ) : (
        <div className="mx-10 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 grid-flow-dense gap-4">
          {posts.map((post) => (
            <div className="" key={post._id}>
              <Post
                post={post}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </div>
          ))}
        </div>
      )}

      <div
        className="w-fit mx-auto m-10 rounded-full shadow-lg hover:shadow-md duration-200"
        onClick={() => setPage((prev) => prev + 1)}
      >
        {isLoading ? <Loader /> : <PlusPage />}
      </div>
    </div>
  );
}

export default Posts;
