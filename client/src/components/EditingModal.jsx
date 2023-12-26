import React, { useState, useRef } from "react";
import { Back, Close } from "../images/Icons";

const EditingModal = ({ imgFile, setimgFile, setShowEditingModal }) => {
  const initialFilterProperties = {
    grayscale: "0%",
    blur: "0px",
    brightness: "100%",
    contrast: "100%",
    hueRotate: "0deg",
    invert: "0%",
    opacity: "100%",
    saturate: "100%",
    sepia: "0%",
  };

  const [filterProperties, setFilterProperties] = useState({
    ...initialFilterProperties,
  });
  const canvasRef = useRef(null);

  const handleFilterChange = (property, value) => {
    setFilterProperties({
      ...filterProperties,
      [property]: value,
    });
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const image = new Image();
    const ctx = canvas.getContext("2d");

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.filter = `grayscale(${filterProperties.grayscale}) blur(${filterProperties.blur}) brightness(${filterProperties.brightness}) contrast(${filterProperties.contrast}) hue-rotate(${filterProperties.hueRotate}) invert(${filterProperties.invert}) opacity(${filterProperties.opacity}) saturate(${filterProperties.saturate}) sepia(${filterProperties.sepia})`;
      ctx.drawImage(image, 0, 0);
      const base64Image = canvas.toDataURL("image/png");
      setimgFile(base64Image);
    };

    image.src = imgFile; // Replace with your image URL
    setShowEditingModal(false);
  };

  const handleRevert = () => {
    setFilterProperties({ ...initialFilterProperties });
  };

  const {
    grayscale,
    blur,
    brightness,
    contrast,
    hueRotate,
    invert,
    opacity,
    saturate,
    sepia,
  } = filterProperties;

  return (
    <div className="relative flex gap-10 max-sm:flex-col justify-center items-center overflow-auto max-h-[70vh]">
      <button
        onClick={() => setShowEditingModal(false)}
        className="absolute right-0 top-0 w-fit p-1 hover:opacity-80 hover:shadow duration-300 rounded-3xl bg-gray-100 border shadow-md flex items-center justify-center font-bold"
      >
        <Close />
      </button>
      <div className="w-1/2 relative max-sm:h-1/2">
        <img
          src={imgFile}
          alt="Sample Image"
          className="w-full object-cover rounded-md"
          style={{
            filter: `grayscale(${grayscale}) blur(${blur}) brightness(${brightness}) contrast(${contrast}) hue-rotate(${hueRotate}) invert(${invert}) opacity(${opacity}) saturate(${saturate}) sepia(${sepia})`,
          }}
        />
      </div>

      <div className="mt-8 flex flex-col gap-1.5 grow text-sm min-w-[250px] max-sm:overflow-auto max-sm:grow-0">
        <label className="flex flex-col">
          <span>Brightness:</span>
          <input
            type="range"
            min="0"
            max="200"
            value={parseInt(brightness)}
            onChange={(e) =>
              handleFilterChange("brightness", `${e.target.value}%`)
            }
          />
        </label>
        <label className="flex flex-col">
          <span>Grayscale:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={parseInt(grayscale)}
            onChange={(e) =>
              handleFilterChange("grayscale", `${e.target.value}%`)
            }
          />
        </label>
        <label className="flex flex-col">
          <span>Blur:</span>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={parseFloat(blur)}
            onChange={(e) => handleFilterChange("blur", `${e.target.value}px`)}
          />
        </label>
        <label className="flex flex-col">
          <span>Contrast:</span>
          <input
            type="range"
            min="0"
            max="200"
            value={parseInt(contrast)}
            onChange={(e) =>
              handleFilterChange("contrast", `${e.target.value}%`)
            }
          />
        </label>
        <label className="flex flex-col">
          <span>Hue Rotate:</span>
          <input
            type="range"
            min="0"
            max="360"
            value={parseInt(hueRotate)}
            onChange={(e) =>
              handleFilterChange("hueRotate", `${e.target.value}deg`)
            }
          />
        </label>
        <label className="flex flex-col">
          <span>Invert:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={parseInt(invert)}
            onChange={(e) => handleFilterChange("invert", `${e.target.value}%`)}
          />
        </label>
        <label className="flex flex-col">
          <span>Opacity:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={parseInt(opacity)}
            onChange={(e) =>
              handleFilterChange("opacity", `${e.target.value}%`)
            }
          />
        </label>
        <label className="flex flex-col">
          <span>Saturate:</span>
          <input
            type="range"
            min="0"
            max="200"
            value={parseInt(saturate)}
            onChange={(e) =>
              handleFilterChange("saturate", `${e.target.value}%`)
            }
          />
        </label>
        <label className="flex flex-col">
          <span>Sepia:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={parseInt(sepia)}
            onChange={(e) => handleFilterChange("sepia", `${e.target.value}%`)}
          />
        </label>

        <div className="mt-4 flex justify-center gap-20">
          <button
            className="p-2 rounded-md bg-blue-600 hover:opacity-80 hover:rounded-2xl duration-200 text-white"
            onClick={handleSaveImage}
          >
            Save Image
          </button>
          <button
            className="p-2 rounded-md bg-red-600 hover:opacity-80 hover:rounded-2xl duration-200 text-white"
            onClick={handleRevert}
          >
            Revert
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default EditingModal;
