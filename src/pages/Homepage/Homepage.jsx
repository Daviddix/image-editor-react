import "./Homepage.css"
import moreOptionsIcon from "../../assets/icons/Group-2.svg"
import searchIcon from "../../assets/icons/Search.svg"
import plusIcon from "../../assets/icons/plus.svg"

import SingleImage from "../../Components/SingleImage/SingleImage"
import DeleteModal from "../../Components/DeleteModal/DeleteModal"
import ImageDetails from "../../Components/ImageDetails/ImageDetails"
import EmptyState from "../../Components/EmptyState/EmptyState"
import ImageNotFound from "../../Components/ImageNotFound/ImageNotFound"

import { useEffect, useRef, useState } from "react"
import DownloadPopup from "../../Components/DownloadPopup/DownloadPopup"
import { Flipper } from "react-flip-toolkit"

function Homepage() {
    const [editedImages, setEditedImages] = useState(() => JSON.parse(localStorage.getItem("edited-images")) || [])
    const hiddenInputRef = useRef(null)
    const [showDeleteAllSmallModal, setShowDeleteAllSmallModal] = useState(false)
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [searchedImages, setSearchedImages] = useState([])
    const [showImageDetails, setShowImageDetails] = useState(false)

    useEffect(()=>{
    localStorage.setItem("edited-images", JSON.stringify(editedImages))
    }, [editedImages])

    useEffect(()=>{
        searchFunctionality(searchTerm)
    }, [searchTerm])

    const mappedImages = editedImages.map(({imageSrc, imageName, imagePreset, imageFilters, id})=>{
        return (
        <Flipper flipId={editedImages} >
        <SingleImage 
        id={id}
        key={id}
        setShowImageDetails={setShowImageDetails}
        editedImages={editedImages}
        setEditedImages={setEditedImages}
        setIsDownloading={setIsDownloading}
        src={imageSrc} 
        name={imageName} 
        preset={imagePreset} 
        filters={imageFilters} />
        </Flipper>
        )
    })

    const mappedSearchedImages = searchedImages.map(({imageSrc, imageName, imagePreset, imageFilters, id})=>{
        return (
        <Flipper flipId={editedImages} >
        <SingleImage 
        id={id}
        key={id}
        setShowImageDetails={setShowImageDetails}
        editedImages={editedImages}
        setEditedImages={setEditedImages}
        setIsDownloading={setIsDownloading}
        src={imageSrc} 
        name={imageName} 
        preset={imagePreset} 
        filters={imageFilters} />
        </Flipper>
        )
    })

    function activateHiddenInput(){
        hiddenInputRef.current.click()
    }

    function addNewImage(e){
    const file = e.target.files
    if(file.length == 1){

        const fileReader = new FileReader
    
        fileReader.readAsDataURL(file[0])
    
        fileReader.onload = function() {
        const imageData = fileReader.result
    
        const newImageObject = {
            imageSrc : imageData,
            imageName : file[0].name,
            imagePreset : null,
            imageFilters: [],
            id : crypto.randomUUID()
        }
    
        setEditedImages((prev)=> [...prev, newImageObject])
        }
    }
    else if(file.length > 1){
        for (let i = 0; i < file.length; i++) {

    const fileReader = new FileReader

    fileReader.readAsDataURL(file[i])

    fileReader.onload = function() {
    const imageData = fileReader.result

    const newImageObject = {
        imageSrc : imageData,
        imageName : file[i].name,
        imagePreset : null,
        imageFilters: [],
        id : crypto.randomUUID()
    }

    setEditedImages((prev)=> [...prev, newImageObject])
    }
            
        }
    }


    }

    function showDeleteModal(e){
        e.stopPropagation()  
        setShowDeleteAllModal(true)  
        setShowDeleteAllSmallModal(false)    
    }

    function searchFunctionality(term){
        if(term.trim() == ""){
            setIsSearching(false)
        }else if(term.trim() !== ""){
        setIsSearching(true)
        const n = editedImages.filter((image)=> image.imageName.trim().toLowerCase().includes(term.trim().toLowerCase()))
        setSearchedImages(n)
        }
    }

  return (
  <>
        <header className="gallery-header">
            <div className="gallery-header-inner">
                <form
                onSubmit={(e)=> {
                    e.preventDefault()
                    searchFunctionality(searchTerm)
                }}
                >
                    <input 
                    onChange={(e)=> {
                        setSearchTerm(e.target.value)
                    }}
                    value={searchTerm}
                    type="text" 
                    required
                    placeholder="Search for an image" />
                    <button>
                        <img src={searchIcon} alt="" />
                    </button>
                </form>

                <button 
                onClick={(e)=> setShowDeleteAllSmallModal((prev)=> !prev)}
                className="options-container">
                    <img src={moreOptionsIcon} alt="more options" />

                    {showDeleteAllSmallModal && 
                    <div 
                    onClick={(e)=> showDeleteModal(e)}
                    className="options">
                        <p>Delete all edited images</p>
                    </div>}
                </button>
            </div>
        </header>

    <main className="gallery-main">
        <div className="gallery-main-inner">
        {editedImages.length > 0 && <h1>Edited Images</h1>}

        <div className="gallery-grid">
            {isSearching == false && mappedImages}
            {isSearching && mappedSearchedImages}
        </div>
        </div>

        <button 
        onClick={activateHiddenInput}
        className="add-new-image">
        <img src={plusIcon} alt="add new image" />
        </button>

        {showDeleteAllModal && <DeleteModal setShowDeleteAllModal={setShowDeleteAllModal} setEditedImages={setEditedImages} />}

        {showImageDetails && <ImageDetails setShowImageDetails={setShowImageDetails} setIsDownloading={setIsDownloading}  editedImages={editedImages}
        setEditedImages={setEditedImages} />}

        {editedImages.length == 0 && <EmptyState  />}
        
        <DownloadPopup isDownloading={isDownloading} />

        {searchedImages.length == 0 && isSearching == true && editedImages.length !== 0 && <ImageNotFound setIsSearching={setIsSearching} setSearchTerm={setSearchTerm} /> }

        <input 
        style={{display: "none"}}
        onChange={(e)=> addNewImage(e)}
        ref={hiddenInputRef}
        type="file"
        accept=".jpg, .png, .jpeg, .wepb, .svg,"
        multiple
        id="" 
        />
        
    </main>
  </>
  )
}

export default Homepage