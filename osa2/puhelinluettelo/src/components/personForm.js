

const PersonForm = ({handleNameChange, handleNumberChange, newName, newNumber, addNumber}) => {
    return (      
        <form>
            <div>
                name: <input onChange={handleNameChange} value={newName}/>
            </div>
            <div>
                number: <input onChange={handleNumberChange} value={newNumber}/>
            </div>
            <div>
                <button type="submit" onClick={addNumber}>add</button>
            </div>
        </form>
    )
}

export default PersonForm