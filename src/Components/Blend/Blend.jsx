import { useState } from "react";
import "./Blend.css";
import { useEffect } from "react";

function Blend({ canvasRef, src }) {
  const [blendColor, setBlendColor] = useState("#ddddee");
  const [blendMode, setBlendMode] = useState("normal");
  const canvas = canvasRef.current;
  const blendModes = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "luminosity",
    "Disable Blend Mode",
  ];

  const mappedBlendModes = blendModes.map((mode) => {
    return (
      <option
        onClick={() => {
          setBlendMode(mode);
        }}
        value="mode"
      >
        {mode}
      </option>
    );
  });

  useEffect(() => {
    if (blendMode == "Disable Blend Mode") {
      const image = new Image();
      image.src = src;

      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
      };
      return;
    }
    setImageBlending(blendColor, canvas, blendMode, src);
  }, [blendColor, blendMode]);

  function setImageBlending(color, canvas, mode, src) {
    const image = new Image();
    image.src = src;

    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      ctx.globalCompositeOperation = mode;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = `${color}49`;

      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
    };
  }
  return (
    <div className="blend-options">
      <div className="color-block">
        <h2>Color</h2>

        <input
          type="color"
          value={blendColor}
          onChange={(e) => {
            setBlendColor(e.target.value);
            setImageBlending(blendColor, canvas, blendMode, src);
          }}
          id=""
        />
      </div>

      <div className="blend-mode">
        <h2>Blend Mode</h2>

        <select name="" id="">
          {mappedBlendModes}
        </select>
      </div>
    </div>
  );
}

export default Blend;
