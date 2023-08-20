import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/posts";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import { LikeFill } from "../../images/Icons";
import Comments from "./Comments";

const PostDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const post = useSelector((state) => state.posts);

    useEffect(() => {
        setLoading(true);
        dispatch(getPost(id));
        setLoading(false);
    }, [id]);


    if (!loading) {
        return (
            <>
                <div className="max-w-6xl mx-auto">
                    <Link
                        to={"/"}
                        className="w-fit mx-2 px-4 py-2 hover:opacity-80 duration-300 rounded-md hover:rounded-3xl bg-lime-600 text-white flex items-center justify-center font-bold"
                    >
                        {"<"} Back
                    </Link>
                </div>

                <div className="relative flex gap-10 max-sm:flex-col-reverse justify-between items-center border p-3 max-w-6xl max-sm:my-5 rounded-lg mx-auto m-10 shadow-lg">
                    <div className="relative flex flex-col gap-3 ml-10 max-sm:mx-5 h-full">
                        <section className="text-xl font-bold">
                            {post.title}
                        </section>
                        <section className="flex gap-3 font-bold text-gray-600 my-2">
                            {post.tags?.map((t) => (
                                <div key={t} className="px-3 bg-gray-200 rounded-full inline shadow-md hover:border-black duration-300 border cursor-pointer">
                                    {" "}
                                    #{t}
                                </div>
                            ))}
                        </section>
                        <section className="text-gray-400">{post.message}</section>
                        <section className="font-semibold text-gray-600">Created by {post.name}</section>
                        <section className="flex gap-2">
                            <LikeFill />
                            <div>
                                {post.likes?.length}{" "}
                                {post.likes?.length === 1 ? "Like" : "Likes"}
                            </div>
                        </section>
                        <section>
                            <Comments post={post} />
                        </section>
                        <section className="text-right text-gray-400 w-full">
                            Posted {moment(post.createdAt).fromNow()}
                        </section>
                    </div>
                    <img
                        src={post.selectedFile}
                        alt=""
                        className="rounded-lg min-w-[50%] max-h-[400px] max-sm:w-full object-contain"
                    />
                </div>
            </>
        );
    } else <div>loading</div>;
};

export default PostDetails;
