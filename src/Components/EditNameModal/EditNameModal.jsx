import "./EditNameModal.css"

function EditNameModal() {
  return (
    <div class="rename-modal-overlay">

        <div class="rename-modal">
            <h1>Rename image</h1>

            <input 
            required
            type="text" name="" id="" />
            <div class="button-container">
                <button class="accept-name-change">
                    Accept changes
                </button>
                <button class="reject-name-change">
                    Cancel
                </button>
        </div>

        </div>
    </div>
  )
}

export default EditNameModal