import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

function Posts({ currentId, setCurrentId }) {
    const posts = useSelector((state) => state.posts);

    return (
        <div className="w-full max-w-[1200px] my-10">
            {!posts.length ? (
                <>
                    <h1 className="text-center">No Memories found...</h1>
                </>
            ) : (
                <div className="mx-10 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 grid-flow-dense gap-4">
                    {posts.map((post) => (
                        <div class="" key={post._id}>
                            <Post
                                post={post}
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Posts;
