import { useEffect, useRef,useState } from "react";
import "./SinglePreset.css"
import {fabric} from "fabric"

function SinglePreset({name, src, setPresetToApply, presetToApply}) {
  const canvasRef = useRef(null)


  function handleClick(){
    setPresetToApply(name)
  }

  function happenOnInitial(canvasId){
    //yeah, yeah.. i know its not supposed to be this way 😹
    const notC = document.querySelectorAll(".right-side .canvas-container")
    
    notC.forEach((image)=>{
      image.classList.add("loading")
    })

    const canvas = new fabric.Canvas(canvasId);

// Load an image onto the canvas
  fabric.Image.fromURL(src, function(img) {
  // Set the position and dimensions of the image
  canvas.setDimensions({ width: img.width, height: img.height });

  // Add the image to the canvas
  canvas.add(img);

  // Apply grayscale filter to the image
  img.filters.push(new fabric.Image.filters[name]());

  // Apply the filters to the image
  img.applyFilters();

  // Render the canvas 
  canvas.renderAll();
  
  notC.forEach((image)=>{
    image.classList.remove("loading")
  })
});
     
  }

  useEffect(()=>{
  happenOnInitial(`preset-canvas-${name}`)
  }, [])
  return (
    <button 
    onClick={handleClick}
    className={presetToApply == name ? "preset-container active" : "preset-container"}>
            <canvas
            id={`preset-canvas-${name}`}
            ref={canvasRef}
            ></canvas>
            <p>{name}</p>
          </button>
  )
}

export default SinglePreset