import "./FilterIcon.css"

function FilterIcon({showFilters}) {
  return (
    <svg
      className={showFilters ? "filter-icon active" : "filter-icon"}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
    >
      <g>
        <path
          fill="none"
          stroke="rgb(128,128,128)"
          stroke-dasharray="0 0 0 0"
          stroke-linecap="butt"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 19.4722C12.0615 20.4223 13.4633 21 15 21c3.3137 0 6-2.6863 6-6 0-2.79575-1.91215-5.1449-4.5-5.81095"
        />
        <path
          fill="none"
          stroke="rgb(128,128,128)"
          stroke-dasharray="0 0 0 0"
          stroke-linecap="butt"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5.5 9.18905C2.91216 9.8551 1 12.20425 1 15c0 3.3137 2.68629 6 6 6 3.3137 0 6-2.6863 6-6 0-.7747-.14685-1.51515-.4142-2.19495"
        />
        <path
          fill="none"
          stroke="rgb(128,128,128)"
          stroke-dasharray="0 0 0 0"
          stroke-linecap="butt"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 13c3.3137 0 6-2.6863 6-6 0-3.31371-2.6863-6-6-6S5 3.68629 5 7c0 3.3137 2.6863 6 6 6h0z"
        />
      </g>
    </svg>
  );
}

export default FilterIcon