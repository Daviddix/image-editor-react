import "./DeleteModal.css"

function DeleteModal({setEditedImages, setShowDeleteAllModal, setTypeOfOperation}) {
  function handleDelete(){
    setTypeOfOperation("delete")
    setEditedImages([])
    setShowDeleteAllModal(false)
  }

  function handleCancel(){
    setShowDeleteAllModal(false)
  }
  return (
    <div className="delete-image-overlay">
    <div className="delete-image-modal">
        <h1>Delete All Images</h1>

        <p>Are you sure you want to delete all your edited images? This action cannot be reversed</p>

        <div className="delete-modal-buttons">
            <button
            onClick={handleCancel}
            >Cancel</button>

            <button
            onClick={handleDelete}
            >Delete</button>
        </div>
    </div>
</div>
  )
}

export default DeleteModal