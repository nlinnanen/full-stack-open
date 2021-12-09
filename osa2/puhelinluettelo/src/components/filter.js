
const Filter = ({ handleFilterChange, filterWith }) => {
   return( 
   <div class="filter flex-space-between">
        Filter shown with&nbsp; <input onChange={ handleFilterChange } value={filterWith}/>
    </div>
   )
}

export default Filter