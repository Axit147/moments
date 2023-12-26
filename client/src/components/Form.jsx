import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../actions/posts";
import { Plus, Minus, Edit } from "../images/Icons";
import EditingModal from "./EditingModal";

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

  const [isOpen, setIsOpen] = useState(false);

  const [imgFile, setimgFile] = useState("");
  const [showEditingModal, setShowEditingModal] = useState(false);

  useEffect(() => {
    currentId ? setIsOpen(true) : setIsOpen(false);
  }, [currentId]);

  useEffect(() => {
    if (post) {
      setPostData(post);
      setimgFile(post.selectedFile);
    }
  }, [post]);

  const clear = (e) => {
    e.preventDefault();
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setimgFile("");
    setCurrentId(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (postData.title === "" || postData.selectedFile === "") {
      alert("PLease fill the required fields");
      return;
    }

    if (currentId) {
      dispatch(updatePost(currentId, postData));
      setCurrentId(null);
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      setCurrentId(null);
    }
    clear(e);
  };

  const editingModalHandler = (e) => {
    e.preventDefault();
    setShowEditingModal(true);
  };

  useEffect(() => {
    setPostData({ ...postData, selectedFile: imgFile });
  }, [imgFile]);

  if (!user) {
    return (
      <div className="rounded-lg bg-white my-10 max-w-[300px] p-8 border-4 border-double text-center drop-shadow-md text-gray-500 font-semibold">
        <h4>Please Log in to create a post or Like other's posts</h4>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center max-w-[350px]" id="form">
        <div
          className={`${
            !isOpen ? "hover:drop-shadow-xl" : "hover:drop-shadow-2xl"
          } ${
            !isOpen ? "drop-shadow-md" : "drop-shadow-xl"
          } focus:border-4 duration-500 rounded-lg bg-white my-10 w-full max-w-[400px] p-5 border-double border-4`}
          action=""
          autoComplete="off"
          noValidate
        >
          <div className="flex justify-between items-center w-full text-lg font-semibold min-w-[300px]">
            <p>{!currentId ? "Create" : "Edit"} Memory</p>
            <span
              className=""
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {!isOpen ? <Plus /> : <Minus />}
            </span>
          </div>

          <div
            className={`wrapper wrapper ${isOpen ? "open" : ""} duration-200`}
          >
            <div className="min-h-0">
              <div
                className={`flex flex-col justify-center items-center gap-4 overflow-hidden mt-5`}
              >
                <div className="w-full">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Title
                  </span>
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
                </div>

                <div className="w-full">
                  <span className="">Message</span>
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
                </div>

                <div className="w-full">
                  <span className="">Tags</span>
                  <input
                    className="w-full px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                    type="text"
                    name="tags"
                    value={postData.tags}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        tags: e.target.value.split(","),
                      })
                    }
                    placeholder="tags (Seperate tags with , (coma) )"
                  />
                </div>

                <div className="w-full">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Photo
                  </span>
                </div>
                <FileBase
                  className="w-full px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    // setPostData({ ...postData, selectedFile: base64 });
                    setimgFile(base64);
                  }}
                />

                <div className="group relative">
                  <div className="group-hover:opacity-100 bg-black/10 backdrop-blur-sm opacity-0 h-full w-full z-20 absolute duration-200 flex items-center justify-center text-white text-xl">
                    <button
                      onClick={(e) => {
                        editingModalHandler(e);
                      }}
                      className="p-2 border-2 rounded-full"
                    >
                      <Edit />
                    </button>
                  </div>
                  {!(imgFile === "") && (
                    <>
                      <img
                        src={imgFile}
                        alt={"Image"}
                        className="object-cover max-w-full"
                      />
                    </>
                  )}
                </div>
                {!(imgFile === "") && (
                  <button
                    onClick={(e) => {
                      editingModalHandler(e);
                    }}
                    className="w-full px-2 py-2 rounded-md bg-sky-600 hover:opacity-80 hover:rounded-3xl duration-200 text-white"
                  >
                    Edit picture
                  </button>
                )}

                <button
                  className="w-full px-2 py-2 rounded-md bg-lime-600 hover:opacity-80 hover:rounded-3xl duration-200 text-white"
                  onClick={(e) => submitHandler(e)}
                >
                  {!currentId ? "Create" : "Edit"}
                </button>

                <button
                  className="w-full px-2 py-1 rounded-md bg-red-600 hover:bg-red-600/80 hover:rounded-2xl duration-200 text-white"
                  onClick={(e) => clear(e)}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
        {showEditingModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-[999]">
            <div className="bg-white p-3 rounded shadow-lg m-0">
              <EditingModal
                setShowEditingModal={setShowEditingModal}
                imgFile={imgFile}
                setimgFile={setimgFile}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Form;
