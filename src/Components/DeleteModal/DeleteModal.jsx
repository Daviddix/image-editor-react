import "./DeleteModal.css"

function DeleteModal() {
  return (
    <div className="delete-image-overlay">
    <div className="delete-image-modal">
        <h1>Delete All Images</h1>

        <p>Are you sure you want to delete all your edited images? This action cannot be reversed</p>

        <div className="delete-modal-buttons">
            <button>Cancel</button>
            <button>Delete</button>
        </div>
    </div>
</div>
  )
}

export default DeleteModal