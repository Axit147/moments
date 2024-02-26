import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import ReactPlayer from "react-player";

import "react-resizable/css/styles.css";
import "tailwindcss/tailwind.css";
import { Drag } from "../images/Icons";
import { useSelector } from "react-redux";

const ResizableComponent = () => {
  const [size, setSize] = useState({
    width: 200,
    height: 400 * (9 / 16),
  });
  const [position, setPosition] = useState({
    x: window.screen.width / 3,
    y: 100,
  });

  const handleResize = (event, { size }) => {
    // setSize({ width: size.width, height: size.width * (9 / 16) });
    setSize(size);
  };

  const myStream = useSelector((state) => state.myStream);
  const userStream = useSelector((state) => state.userStream);

  return (
    <div className="fixed z-[999]">
      <Draggable
        onDrag={(e) => {
          setPosition({ x: e.x, y: e.y });
        }}
      >
        <div
          className="fixed top-10 h-5 w-5 border-2 rounded-full z-[999] cursor-move flex justify-center items-center"
          style={{ top: 90, left: window.screen.width / 3 }}
          onTouchMove={(e) => {
            setPosition({
              x: Math.floor(e.changedTouches[0].screenX),
              y: Math.floor(e.changedTouches[0].screenY) - 115,
            });
          }}
        >
          <Drag />
        </div>
      </Draggable>
      <ResizableBox
        width={size.width}
        height={size.height}
        onResize={handleResize}
        minConstraints={[100, 200 * (9 / 16)]}
        lockAspectRatio
        axis="both"
        className="fixed z-[999] h-full w-full border backdrop-blur-sm aspect-video duration-100 p-3"
        style={{
          top: position.y + 15 + "px",
          left: position.x - size.width / 2 + "px",
        }}
      >
        <div className="w-full h-full flex flex-col justify-between">
          {myStream && (
            <ReactPlayer
              height={"49%"}
              width={"100%"}
              playing
              muted
              url={myStream}
            />
          )}
          {userStream && (
            <ReactPlayer
              height={"49%"}
              width={"100%"}
              playing
              url={userStream}
              // muted
            />
          )}
        </div>
      </ResizableBox>
    </div>
  );
};

export default ResizableComponent;
