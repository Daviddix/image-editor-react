import "./DownloadPopup.css"

function DownloadPopup({isDownloading}) {
  return (
     <div className={isDownloading? "download-popup opened" : "download-popup"}>
      <p>Downloading Image</p>
     </div>
  )
}

export default DownloadPopup