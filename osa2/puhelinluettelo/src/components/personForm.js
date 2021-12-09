

const PersonForm = ({handleNameChange, handleNumberChange, newName, newNumber, addNumber}) => {
    return (      
        <form class="person-form">
            <div class="name-input flex-space-between">
                Name: <input onChange={handleNameChange} value={newName}/>
            </div>
            <div class="number-input flex-space-between">
                Number: <input onChange={handleNumberChange} value={newNumber}/>
            </div>
            <div>
                <button class="add-btn" type="submit" onClick={addNumber}>Add</button>
            </div>
        </form>
    )
}

export default PersonForm