import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/auth");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="sticky z-[10] top-0 flex justify-center items-center w-full">
      <div className="backdrop-blur bg-white/50 flex justify-between items-center border shadow-md py-2 px-6 w-full mb-10 rounded-md grow">
        <Link
          to={"/"}
          className="text-2xl font-bold flex items-center max-sm:text-lg"
        >
          <div className="h-[60px] w-[60px] rounded-full overflow-hidden border mx-2">
            <img
              src="https://st2.depositphotos.com/3616015/5401/v/450/depositphotos_54011251-stock-illustration-camera-flat-icon-with-long.jpg"
              alt=""
            />
          </div>
          Moments
        </Link>

        {user ? (
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-1">
              {user.result?.dp ? (
                <img
                  src={user.result?.dp}
                  alt={user.result?.name}
                  className="bg-gray-200 h-[2rem] w-[2rem] rounded-full inline contain"
                />
              ) : (
                <p className="bg-blue-600 text-white flex justify-center items-center h-[2rem] w-[2rem] rounded-full font-semibold">
                  {user.result?.name.charAt(0)}
                </p>
              )}
              <p className="inline max-sm:hidden">{user.result?.name}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-600/80 hover:rounded-3xl duration-200 text-white rounded-md py-2 px-4 hover:shadow-md"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link
            to={"/auth"}
            className="bg-lime-600 hover:bg-lime-600/80 hover:rounded-3xl duration-200 text-white rounded-md py-2 px-4 hover:shadow-md"
          >
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
