import "./SingleImage.css"
import downloadIcon from "../../assets/icons/download.svg"
import deleteIcon from "../../assets/icons/trash-2.svg"
import editIcon from "../../assets/icons/edit-2.svg"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

import {set, get} from "idb-keyval"

function SingleImage({src, name, preset, filters,setIsDownloading, editedImages, setEditedImages, id, setShowImageDetails, setTypeOfOperation}) {
    const linkRef = useRef(null)
    const navigate = useNavigate()


    function handleDownload(tagRef){
        tagRef.current.click()
        setIsDownloading(true)
        setTimeout(() => {
            setIsDownloading(false)
        }, 2000);
    }

    function handleDelete(imageId){
        setTypeOfOperation("delete")
        const newEditedImages = editedImages.filter((image)=> image.id !== imageId)
        setEditedImages(newEditedImages)
    }

    function handleImageClick(){
        set("image-clicked", {name: name, src: src, id: id})
        setShowImageDetails(true)
    }

    function handleEditButtonClicked(){
        set("image-clicked", {name: name, src: src, id: id})
        navigate("/editor")
    }


  return (
    <div className="image">
                <img 
                onClick={()=>handleImageClick()}
                src={src} 
                alt={name} />

                <div className="image-options-overlay">
                    <p>{name}</p>
                    <div className="options-buttons-container">
                        <button 
                        onClick={()=> handleEditButtonClicked()}
                        className="edit">
                            <img src={editIcon} alt="edit this image" />
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
                </div>

            <a 
            ref={linkRef}
            href={src}
            download={name} 
            style={{display: "none"}}></a>

            </div>
  )
}

export default SingleImage