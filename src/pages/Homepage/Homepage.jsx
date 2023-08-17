import "./Homepage.css"
import moreOptionsIcon from "../../assets/icons/Group-2.svg"
import searchIcon from "../../assets/icons/Search.svg"
import plusIcon from "../../assets/icons/plus.svg"

import SingleImage from "../../Components/SingleImage/SingleImage"
import DeleteModal from "../../Components/DeleteModal/DeleteModal"
import ImageDetails from "../../Components/ImageDetails/ImageDetails"
import EmptyState from "../../Components/EmptyState/EmptyState"

function Homepage() {
  return (
  <>
        <header className="gallery-header">
            <div className="gallery-header-inner">
                <form>
                    <input type="text" placeholder="Search for an image" />
                    <button>
                        <img src={searchIcon} alt="" />
                    </button>
                </form>

                <button className="options-container">
                    <img src={moreOptionsIcon} alt="more options" />

                    <div className="options">
                        <p>Delete all edited images</p>
                    </div>
                </button>
            </div>
        </header>

        <main className="gallery-main">
        <div className="gallery-main-inner">
        <h1>Edited Images</h1>

        <div className="gallery-grid">
        <SingleImage />
        <SingleImage />
        <SingleImage />
        <SingleImage />
        <SingleImage />
        <SingleImage />
        </div>
        </div>

        <button className="add-new-image">
        <img src={plusIcon} alt="add new image" />
        </button>

        <DeleteModal />
        <ImageDetails />
        <EmptyState />
        
    </main>
  </>
  )
}

export default Homepage