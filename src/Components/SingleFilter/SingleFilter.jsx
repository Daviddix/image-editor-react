import "./SingleFilter.css"
import saturationIcon from "../../assets/icons/saturation.svg"

function SingleFilter() {
  return (
    <button className="filter-container">
    <img src={saturationIcon} alt="" />
    <p>Saturation</p>
  </button>
  )
}

export default SingleFilter