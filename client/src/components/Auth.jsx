import React, { useState } from "react";
import { ShowPassword, HidePassword } from "../images/Icons";
import { useDispatch } from "react-redux";
import { login, signup } from "../actions/auth";
import { useNavigate, Link } from "react-router-dom";

const initialData = { firstName: "", lastName: "", email: "", password: "" };
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [formData, setFormData] = useState(initialData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(login(formData, navigate));
        } else {
            dispatch(signup(formData, navigate));
        }
    };
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="">
            <form
                action=""
                className="drop-shadow-md flex flex-col justify-center items-center gap-5 rounded-lg bg-white my-10 max-w-[400px] p-5 border mx-auto"
            >
                <header className="text-xl font-semibold">
                    {isLogin ? "Log In" : "Sign Up"}
                </header>
                {isLogin ? (
                    <>
                        <input
                            type="email"
                            name="email"
                            id=""
                            className="w-full px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                            placeholder="E-mail"
                            onChange={changeHandler}
                        />
                        <div className="flex items-center justify-between w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id=""
                                className="grow px-2 py-1 rounded-l-md bg-gray-100 outline-gray-300 border border-r-0"
                                placeholder="Password"
                                onChange={changeHandler}
                            />
                            <div
                                className="bg-gray-100 p-1 rounded-r-md border max-h-full border-l-0"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <HidePassword /> : <ShowPassword />}
                            </div>
                        </div>
                        <button
                            onClick={submitHandler}
                            className="bg-lime-600 hover:bg-lime-600/80 hover:rounded-3xl duration-200 text-white rounded-md py-2 px-4 hover:shadow-md"
                        >
                            Log in
                        </button>
                        <p>
                            Don't have an account?{" "}
                            <span
                                onClick={() => setIsLogin(!isLogin)}
                                className="cursor-pointer underline text-blue-900 font-semibold"
                            >
                                Sign Up
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between">
                            <input
                                type="text"
                                name="firstName"
                                className="w-[49%] px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                                placeholder="First Name"
                                onChange={changeHandler}
                            />
                            <input
                                type="text"
                                name="lastName"
                                className="w-[49%] px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                                placeholder="Last Name"
                                onChange={changeHandler}
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            id=""
                            className="w-full px-2 py-1 rounded-md bg-gray-100 outline-gray-300 border"
                            placeholder="E-mail"
                            onChange={changeHandler}
                        />
                        <div className="flex items-center justify-between w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id=""
                                className="grow px-2 py-1 rounded-l-md bg-gray-100 outline-gray-300 border border-r-0"
                                placeholder="Password"
                                onChange={changeHandler}
                            />
                            <div
                                className="bg-gray-100 p-1 rounded-r-md border max-h-full border-l-0"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <HidePassword /> : <ShowPassword />}
                            </div>
                        </div>
                        <button
                            onClick={submitHandler}
                            className="bg-blue-600 hover:bg-blue-600/80 hover:rounded-3xl duration-200 text-white rounded-md py-2 px-4 hover:shadow-md"
                        >
                            Sign Up
                        </button>
                        <p>
                            Already have an account?{" "}
                            <span
                                onClick={() => setIsLogin(!isLogin)}
                                className="cursor-pointer underline text-blue-900 font-semibold"
                            >
                                Log In
                            </span>
                        </p>
                    </>
                )}
            </form>
            <Link
                to={"/"}
                className="block bg-yellow-500 hover:bg-yellow-500/80 hover:rounded-3xl duration-200 text-white rounded-md py-2 px-4 hover:shadow-md mx-auto max-w-[100px] text-center"
            >
                Home
            </Link>
        </div>
    );
};

export default Auth;
