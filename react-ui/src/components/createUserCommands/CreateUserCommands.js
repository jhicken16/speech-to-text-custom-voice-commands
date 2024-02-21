import { useState } from 'react'

import { deleteMethod, punctuationMethod } from "../../voiceMethods/commandFunctions";

export default function CreateUserCommands({addToCommands}){

    const [command, setCommand] = useState('')
    const [selectedFunction, setSelectedFunction] = useState('')
    const [description, setDescription] = useState('')
    const [selectedChar, setSelectedChar] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        let func = null
        console.log(selectedFunction)
        switch (selectedFunction){
            case "Delete Command":
                func = deleteMethod
                break;
            case "Add Punctuation":
                func = punctuationMethod
                break;
            default:
                break;
        }
        
        addToCommands(command, description, func, selectedChar)
    }

    const handleCommand = (event) => {
        event.preventDefault()
        setCommand(event.target.value)
    }

    const handleSelectingFunction = (event) => {
        event.preventDefault()
        setSelectedFunction(event.target.value)
    }

    const handleDescription = (event) => {
        event.preventDefault()
        setDescription(event.target.value)
    }

    const handleCharInputChange = (event) => {
        event.preventDefault()
        setSelectedChar(event.target.value)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='command'>Single Word Command:</label>
                <input 
                    type="text"
                    id="command"
                    pattern='[A-Za-z]+'
                    value={command}
                    onChange={handleCommand}
                />

                <select value={selectedFunction} onChange={handleSelectingFunction}>
                    <option value={null}> Please Select</option>
                    <option value="Delete Command"> Delete Command </option>
                    <option value="Add Punctuation"> Add Punctuation </option>
                </select>
                <label htmlFor='description'>Short Description of Command:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={handleDescription}
                    />
                <label htmlFor="charInput">{selectedFunction === "Delete Command" ? 'Delete Up To Char' : 'Add Char To Last Word'}</label>
                    <input
                    type="text"
                    id="charInput"
                    maxLength="1"
                    value={selectedChar}
                    onChange={handleCharInputChange}
                    />
                <button type="submit">Add Command</button>
            </form>
            

        </>
    )
}