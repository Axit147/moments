import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../actions/posts";
import { Plus, Minus } from "../images/Icons";

function Form({ currentId, setCurrentId }) {
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

    const post = useSelector((state) =>
        currentId ? state.posts.find((p) => p._id === currentId) : null
    );

    const [expand, setExpand] = useState("hidden");

    useEffect(() => {
        currentId ? setExpand("block") : setExpand(expand);
    }, [currentId]);

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData));
            setCurrentId(null);
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            setCurrentId(null);
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    };

    if (!user) {
        return (
            <div className="rounded-lg bg-white my-10 max-w-[300px] p-8 border text-center drop-shadow-md text-gray-500 font-semibold">
                <h4>Please Log in to create a post or Like other's posts</h4>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center">
                <form
                    className={`${expand === "hidden"
                        ? "hover:drop-shadow-xl"
                        : "hover:drop-shadow-2xl"
                        } ${expand === "hidden" ? "drop-shadow-md" : "drop-shadow-xl"
                        } focus:border-4 duration-500 rounded-lg bg-white my-10 max-w-[400px] p-5 border`}
                    action=""
                    autoComplete="off"
                    onSubmit={submitHandler}
                    noValidate
                >
                    <div className="flex justify-between items-center w-full text-lg font-semibold  min-w-[300px]">
                        <p>{!currentId ? "Create" : "Edit"} Memory</p>
                        <span
                            className=""
                            onClick={() => {
                                setExpand(expand === "hidden" ? "block" : "hidden");
                            }}
                        >
                            {expand === "hidden" ? <Plus /> : <Minus />}
                        </span>
                    </div>

                    <div
                        className={`flex flex-col justify-center items-center gap-5 mt-5 overflow-hidden ${expand} expandable`}
                    >
                        <input
                            className="w-full px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                            type="text"
                            name="title"
                            value={postData.title}
                            onChange={(e) =>
                                setPostData({ ...postData, title: e.target.value })
                            }
                            placeholder="title"
                        />
                        <textarea
                            className="w-full px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                            type="text"
                            name="message"
                            value={postData.message}
                            onChange={(e) =>
                                setPostData({ ...postData, message: e.target.value })
                            }
                            placeholder="message"
                        />
                        <input
                            className="w-full px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                            type="text"
                            name="tags"
                            value={postData.tags}
                            onChange={(e) =>
                                setPostData({ ...postData, tags: e.target.value.split(",") })
                            }
                            placeholder="tags (Seperate tags with , (coma) )"
                        />
                        <FileBase
                            className="w-full px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                                setPostData({ ...postData, selectedFile: base64 })
                            }
                        />

                        <button
                            className="w-full px-2 py-2 rounded-md bg-lime-600 hover:bg-lime-600/80 hover:rounded-3xl duration-200 text-white"
                            type="submit"
                        >
                            {!currentId ? "Create" : "Edit"}
                        </button>

                        <button
                            className="w-full px-2 py-1 rounded-md bg-red-600 hover:bg-red-600/80 hover:rounded-2xl duration-200 text-white"
                            type="submit"
                            onClick={clear}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
export default Form;
