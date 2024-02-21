import { useState } from 'react'

export default function DisplayCommands({command, commandDescription, removeCommand, changeCommand}){
    
    //pass down function to change elements in the object inside the command hash
    const [commandState, setCommandState] = useState(command)

    const handleCommandState = (event) => {
        event.preventDefault()
        setCommandState(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        changeCommand(commandState, command)
    }

    return (
        <>
        {/* Display all object values */}
        <h4>{commandDescription}</h4>
        <form onSubmit={handleSubmit}>
        <label htmlFor='command'>Command:  </label>
                <input 
                    type="text"
                    id="command"
                    pattern='[A-Za-z]+'
                    value={commandState}
                    onChange={handleCommandState}
                />
                <button type="submit">Change Command</button>
        </form>

        <button onClick={() => removeCommand(command)}>Remove Command</button>
        </>
    )
}