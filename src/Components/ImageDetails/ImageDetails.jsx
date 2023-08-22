import downloadIcon from "../../assets/icons/download.svg"
import deleteIcon from "../../assets/icons/trash-2.svg"
import editIcon from "../../assets/icons/edit-2.svg"
import closeIcon from "../../assets/icons/x.svg"

import "./ImageDetails.css"

import {useRef} from "react"
import { useNavigate } from "react-router-dom"

function ImageDetails({setShowImageDetails, setIsDownloading, editedImages, setEditedImages}) {
  const {name, src, id} = JSON.parse(localStorage.getItem("image-clicked"))
  const linkRef = useRef(null)
  const navigate = useNavigate()

  function handleClose(){
    setShowImageDetails(false)
  }

  function handleDownload(tagRef){
    tagRef.current.click()
    setIsDownloading(true)
    setTimeout(() => {
        setIsDownloading(false)
    }, 2000);
  }

  function handleDelete(imageId){
    const newEditedImages = editedImages.filter((image)=> image.id !== imageId)
    setEditedImages(newEditedImages)
    handleClose()
  }

  function handleEditButtonClicked(){
    localStorage.setItem("image-clicked", JSON.stringify({name: name, src: src, id: id}))
    navigate("/editor")
}

  return (
    <div className="image-details-overlay">

    <div className="image-details-overlay-inner">
         <div className="image-details-overlay-heading">
        <p>{name}</p>

        <button>
        <img 
        onClick={()=> handleClose()}
        src={closeIcon} alt="close icon" />
        </button>
         </div>

         <img src={src} alt="your image" />

          <div className="details-button-container">
                <button className="edit">
                    <img 
                    onClick={()=> handleEditButtonClicked()}
                    src={editIcon} alt="edit this image" />
                </button>

                <button 
                onClick={()=> handleDelete(id)}
                className="delete">
                    <img src={deleteIcon} alt="delete this image" />
                </button>

                <button 
                onClick={()=> handleDownload(linkRef)}
                className="download">
                    <img src={downloadIcon} alt="download this image" />
                </button>
          </div>

          <a 
            ref={linkRef}
            href={src}
            download={name} 
            style={{display: "none"}}></a>
        </div>
   
</div>
  )
}

export default ImageDetails