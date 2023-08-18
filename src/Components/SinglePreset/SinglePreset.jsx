import "./SinglePreset.css"
import trial from "../../../../My Pictures/web2.png"

function SinglePreset() {
  return (
    <button className="preset-container">
            <img src={trial} alt="" />
            <p>Original</p>
          </button>
  )
}

export default SinglePreset