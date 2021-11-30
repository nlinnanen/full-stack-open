import react from "react"

const Filter = ({ handleFilterChange, filterWith }) => {
   return( 
   <div>
        filter shown with <input onChange={ handleFilterChange } value={filterWith}/>
    </div>
   )
}

export default Filter