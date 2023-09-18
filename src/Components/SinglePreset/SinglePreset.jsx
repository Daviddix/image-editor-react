import { useEffect, useRef,useState } from "react";
import "./SinglePreset.css"
import applyPreset from "../../libs/applyPreset";

function SinglePreset({name, src, setPresetToApply, presetToApply, setUserHasSaved}) {

  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef(null) 

  function handleClick(){
    setPresetToApply(name)
    setUserHasSaved(false)
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
    setTimeout(() => {
      setIsLoading(false)    
    }, 1000);
  }

  useEffect(()=>{
  happenOnInitial()
  

  }, [])

  return (
    <button 
    onClick={handleClick}
    className={presetToApply == name ?
    isLoading ? 
    "preset-container active loading" 
    : "preset-container active" 
    : 
    isLoading ? 
    "preset-container loading"
      :
      "preset-container"
  }>
            <canvas
            ref={canvasRef}
            ></canvas>
            <p
            className="loading"
            >{name}</p>
          </button>
  )
}

export default SinglePreset