import { useEffect, useRef,useState } from "react";
import "./SinglePreset.css"
import applyPreset from "../../libs/applyPreset";

function SinglePreset({name, src, setPresetToApply, presetToApply}) {

  const canvasRef = useRef(null)

  function handleClick(){
    setPresetToApply(name)
  }

  function happenOnInitial(){
    const image = new Image();
    image.src = src;
    
    
    image.onload = function() {
      canvasRef.current.width = image.width;
      canvasRef.current.height = image.height;
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(image, 0, 0)

      applyPreset(ctx, canvasRef, name)
    }
  }

  useEffect(()=>{
  happenOnInitial()
  }, [])

  return (
    <button 
    onClick={handleClick}
    className={presetToApply == name ? "preset-container active" : "preset-container"}>
            <canvas
            ref={canvasRef}
            ></canvas>
            <p>{name}</p>
          </button>
  )
}

export default SinglePreset