import "./ImageNotFound.css"

function ImageNotFound({setIsSearching, setSearchTerm}) {
  function handleShowAllButton (){
    setIsSearching(false)
    setSearchTerm("")
  }
  return (
    <div className="not-found-container">
    <p className="not-found-text">
    Seems like you don't have any saved images yes, click on the "+" button below to add a new image and start editing
    </p>

    <button
    onClick={()=> handleShowAllButton()}
    >Show All Images</button>
    
    </div>
  )
}

export default ImageNotFound