import "./SingleFilter.css"

function SingleFilter({name, icon, filterToApply, setFilterToApply, src}) {
  function handleClick(){
    setFilterToApply(name) 
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