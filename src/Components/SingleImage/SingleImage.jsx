import "./SingleImage.css"
import downloadIcon from "../../assets/icons/download.svg"
import deleteIcon from "../../assets/icons/trash-2.svg"
import editIcon from "../../assets/icons/edit-2.svg"

import trial from "../../../../My Pictures/r.jpg"

function SingleImage() {
  return (
    <div className="image">
                <img src={trial} alt="" />

                <div className="image-options-overlay">
                    <p>My image name</p>
                    <div className="options-buttons-container">
                        <button className="edit">
                            <img src={editIcon} alt="edit this image" />
                        </button>

                        <button className="delete">
                            <img src={deleteIcon} alt="delete this image" />
                        </button>

                        <button className="download">
                            <img src={downloadIcon} alt="download this image" />
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default SingleImage