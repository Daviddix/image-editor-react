import moreIcon from "../../assets/icons/Group-2.svg"
import saveIcon from "../../assets/icons/Group-3.svg"
import undoIcon from "../../assets/icons/Group.svg"
import downloadIcon from "../../assets/icons/Group-1.svg"
import backArrow from "../../assets/icons/back-button.svg"
import presetIcon from "../../assets/icons/preset.svg"
import filterIcon from "../../assets/icons/filters.svg"
import saturationIcon from "../../assets/icons/saturation.svg"


import trial from "../../../../My Pictures/d.jpg"


import "./Editor.css"

function Editor() {
  return (
    <main className="editor-main">
      <div className="left-side">
        <div className="top-controls">
          <div className="back">
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


            <button>
              <img src={moreIcon} alt="view more settings" />
            </button>

            <div className="image-options">
              <button>Rename</button>
              <button>Clear all changes</button>
            </div>
          </div>
        </div>


        <img src={trial} alt="image you're editing" />

        <div className="name-and-input">
          <p>B/W</p>
          <small>7</small>
          <input type="range" name="" id="" />
        </div>
      </div>

      <div className="right-side">
        <div className="filters-container">
          <button className="filter-container">
            <img src={saturationIcon} alt="" />
            <p>Saturation</p>
          </button>

          <button className="filter-container">
            <img src={saturationIcon} alt="" />
            <p>Saturation</p>
          </button>

          <button className="filter-container">
            <img src={saturationIcon} alt="" />
            <p>Saturation</p>
          </button>

          <button className="filter-container">
            <img src={saturationIcon} alt="" />
            <p>Saturation</p>
          </button>

          <button className="filter-container">
            <img src={saturationIcon} alt="" />
            <p>Saturation</p>
          </button>

          <button className="filter-container">
            <img src={saturationIcon} alt="" />
            <p>Saturation</p>
          </button>

          <button className="filter-container">
            <img src={saturationIcon} alt="" />
            <p>Saturation</p>
          </button>

          <button className="filter-container">
            <img src={saturationIcon} alt="" />
            <p>Saturation</p>
          </button>
        </div>
        <div className="presets-container">
          <button className="preset-container">
            <img src={trial} alt="" />
            <p>Original</p>
          </button>

          <button className="preset-container">
            <img src={trial} alt="" />
            <p>Original</p>
          </button>

          <button className="preset-container">
            <img src={trial} alt="" />
            <p>Original</p>
          </button>

          <button className="preset-container">
            <img src={trial} alt="" />
            <p>Original</p>
          </button>

          <button className="preset-container">
            <img src={trial} alt="" />
            <p>Original</p>
          </button>

          <button className="preset-container">
            <img src={trial} alt="" />
            <p>Original</p>
          </button>

          <button className="preset-container">
            <img src={trial} alt="" />
            <p>Original</p>
          </button>

          <button className="preset-container">
            <img src={trial} alt="" />
            <p>Original</p>
          </button>
        </div>

        <div className="switcher">
          <button>
            <img src={presetIcon} alt="image presets" />
          </button>

          <button>
            <img src={filterIcon} alt="image filters" />
          </button>
        </div>
      </div>
    </main>
  )
}

export default Editor