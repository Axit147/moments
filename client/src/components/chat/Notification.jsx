import React, { useRef, useState, useEffect } from "react";
import { Bell } from "../../images/Icons";
import moment from "moment";

const Notification = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const notiRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!notiRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div className={`relative cursor-pointer`} ref={notiRef}>
        <div
          className={`wrrapper ${
            isOpen ? "open" : ""
          } absolute duration-200 right-1/2 bottom-[140%] shadow-xl`}
        >
          <div
            className={`bg-white min-h-0 w-max grid divide-y-2 border-4 border-double`}
          >
            {notifications.length ? (
              notifications.map((n) => (
                <div className="p-3 hover:scale-[1.05] duration-100">
                  <p className="text-sm">New messages from {n.from}</p>
                  <p className="text-xs font-extralight text-right">
                    {moment(n.updatedAt).fromNow()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm p-3">No notifications</p>
            )}
          </div>
        </div>
        <div
          className={`${isOpen ? "scale-110" : ""} duration-150`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="h-4 w-4 rounded-full bg-red-500 absolute -top-2 -right-1 text-center text-xs text-white">
            {notifications.length}
          </span>
          <Bell />
        </div>
      </div>
    </>
  );
};

export default Notification;
