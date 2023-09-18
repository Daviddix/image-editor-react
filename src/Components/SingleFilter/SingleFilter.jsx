import "./SingleFilter.css"

function SingleFilter({name, setUserHasSaved, icon, filterToApply, setFilterToApply, src}) {
  function handleClick(){
    setFilterToApply(name) 
    setUserHasSaved(false)
  }
  return (
    <button 
    onClick={()=> handleClick()}
    className="filter-container">
    <img src={icon} alt="" />
    <p>{name}</p>
  </button>
  )
}

export default SingleFilter