import React, { useState, useEffect } from "react";
import Form from "./Form";
import Posts from "./Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId, user]);

    return (
        <div className="flex flex-col gap-5 w-full justify-around items-center">
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
        </div>
    );
};

export default Home;
