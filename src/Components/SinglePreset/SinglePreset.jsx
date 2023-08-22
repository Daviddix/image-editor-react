import "./SinglePreset.css"

function SinglePreset({name, src, setPresetToApply, presetToApply}) {
  function handleClick(){
    setPresetToApply(name)
  }
  return (
    <button 
    onClick={handleClick}
    className={presetToApply == name ? "preset-container active" : "preset-container"}>
            <img src={src} alt="" />
            <p>{name}</p>
          </button>
  )
}

export default SinglePreset