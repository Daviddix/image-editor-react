import moreIcon from "../../assets/icons/Group-2.svg"
import saveIcon from "../../assets/icons/Group-3.svg"
import undoIcon from "../../assets/icons/Group.svg"
import downloadIcon from "../../assets/icons/Group-1.svg"
import backArrow from "../../assets/icons/back-button.svg"
import presetIcon from "../../assets/icons/preset.svg"
import filterIcon from "../../assets/icons/filters.svg"


import "./Editor.css"
import SinglePreset from "../../Components/SinglePreset/SinglePreset"
import SingleFilter from "../../Components/SingleFilter/SingleFilter"
import EditNameModal from "../../Components/EditNameModal/EditNameModal"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import {fabric} from "fabric"

function Editor() {
  const {name, src} = JSON.parse(localStorage.getItem("image-clicked"))
  const navigate = useNavigate()
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const canvasRef = useRef(null)
  const [presetToApply, setPresetToApply] = useState("")
  const presets = ["Original", 'Grayscale', 'Invert', 'Sepia', 'Brownie','Vintage',
  'Technicolor','Polaroid', 'Kodachrome','BlackWhite']

  const mappedPresets = presets.map((preset)=>{
    return <SinglePreset presetToApply={presetToApply} setPresetToApply={setPresetToApply} src={src} name={preset} />
  })

  useEffect(()=>{
    happenOnInitial()
  }, [presetToApply])

  function handleBackNavigation(){
    navigate("/")
  }

  function happenOnInitial(){

    var canvas = new fabric.Canvas('canvee');

// Load an image onto the canvas
fabric.Image.fromURL(src, function(img) {
  // Set the position and dimensions of the image
  canvas.setDimensions({ width: img.width, height: img.height });

  // Add the image to the canvas
  canvas.add(img);

  // Apply grayscale filter to the image
  img.filters.push(new fabric.Image.filters[presetToApply]());

  // Apply the filters to the image
  img.applyFilters();

  // Render the canvas
  canvas.renderAll();
});
     
  }
  return (
    <main className="editor-main">
      <div className="left-side">
        <div className="top-controls">
          <div 
          tabIndex={0}
          onClick={()=> handleBackNavigation()}
          className="back">
            <button>
              <img src={backArrow} alt="go back to your gallery" />
            </button>
          </div>

          <div className="other-controls">
            <button>
              <img src={undoIcon} alt="remove your last filter" />
            </button>


            <button>
              <img src={downloadIcon} alt="download your edited image" />
            </button>


            <button>
              <img src={saveIcon} alt="save your changes" />
            </button>


            <button
            onClick={()=> setShowMoreOptions((prev) => !prev)}
            >
              <img src={moreIcon} alt="view more settings" />
            </button>

            {showMoreOptions && <div className="image-options">
              <button>Rename</button>
              <button>Clear all changes</button>
            </div>}
          </div>
        </div>


        
          <canvas id="canvee" ref={canvasRef} className="image-to-edit" ></canvas> 

        <div className="name-and-input">
          <p>B/W</p>
          <small>7</small>
          <input type="range" name="" id="" />
        </div>
      </div>

      <div className="right-side">
        <div className="filters-container">
          <SingleFilter />
        </div>
        <div className="presets-container">

          {mappedPresets}
        </div>

        <div className="switcher">
          <button>
            <img src={presetIcon} alt="image presets" />
          </button>

          <button>
            <img src={filterIcon} alt="image filters" />
          </button>
        </div>

        <EditNameModal />

        
      </div>
    </main>
  )
}

export default Editor