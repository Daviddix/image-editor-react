import downloadIcon from "../../assets/icons/download.svg"
import deleteIcon from "../../assets/icons/trash-2.svg"
import editIcon from "../../assets/icons/edit-2.svg"
import closeIcon from "../../assets/icons/x.svg"

import "./ImageDetails.css"
import trial from "../../../../My Pictures/r.jpg"

function ImageDetails() {
  return (
    <div className="image-details-overlay">

    <div className="image-details-overlay-inner">
         <div className="image-details-overlay-heading">
        <p>My image name</p>

        <button>
        <img src={closeIcon} alt="close icon" />
        </button>
    </div>

    <img src={trial} alt="your image" />

    <div className="details-button-container">
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

export default ImageDetails