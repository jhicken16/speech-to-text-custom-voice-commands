/*
I need a very quick look up time. 

Using a hash function is to long as it will have to hash on every word added and then check all element in linked list.

and key can not be command fease as every word will have to be converted to lowercase and have punctuation remove

The key for the hash map is going to be letters they will only be added if the do no exist already 
they will not be initiated at stat. this should improve best case if letter does not exist will return undefined and continue

Concerns
Users my choose command words that all end in the same letter. 
users may choose numbers, i will have to prevent this.
users may choose signal letter as command witch my be a uppercase depending on browser 
*/
import {useState} from 'react'

export default function useCommandsHash(){
    const [hash, setHash] = useState({})

    function addToCommands ( command, commandDescription, callback, argumentsToPass, functionType) {
            
        command = cleanCommand(command)
        const regex = createRegexExpression(command)
    
        if(hash[command[command.length - 1]] !== undefined){
            
            setHash(prev => ({
                ...prev,
                [command[command.length - 1]]: 
                    [...prev[command[command.length - 1]], {
                        command,
                        regex, 
                        commandDescription, 
                        callback, 
                        argumentsToPass,
                        functionType
                    }]
            }))
        }
        else{
            //create new object and set it === to node in linked list.
            setHash(prev => ({...prev, 
                [command[command.length - 1]]: [{
                    command,
                    regex, 
                    commandDescription, 
                    callback, 
                    argumentsToPass,
                    functionType
                }]
            }))
        }
    }

    function removeCommand( command ){
            const hashKey = hash[command[command.length - 1]]

            let removedObj = {}
            for( let x = 0; x < hashKey.length; x++){
                if(hashKey[x].regex.test(command)){
                    removedObj = hashKey[x]
                    setHash(prev => ({...prev,
                        [command[command.length - 1]]: [
                            ...hashKey.slice(0, x),
                            ...hashKey.slice(x+1)
                        ]
                    }))
                    console.log(hashKey)
                    console.log(hashKey.length)
                    if(hashKey.length === 1){
                        hashRemoveKeyFormObject(command[command.length - 1])
                    }
                    return removedObj
                }
            }
        }

        function hashRemoveKeyFormObject(key){
            setHash((prev) => {
                delete prev[key]
                return prev
            })
        }

        function changeCommand( newCommand, oldCommand ){
            //TODO - Also change regex expression
            newCommand = cleanCommand(newCommand)
            const newRegex = createRegexExpression(newCommand)

            if(newCommand[newCommand.length - 1] === oldCommand[oldCommand.length - 1]){
                setHash((prev) => {
                    return ({
                        ...prev,
                        [newCommand[newCommand.length - 1]]: prev[newCommand[newCommand.length - 1]].map((obj) => {
                           return obj.regex.test(oldCommand) ? {...obj, command: newCommand, regex: newRegex} : obj
                        })
                    })
                })
            }
            else{
                let oldObject = removeCommand(oldCommand)
                addToCommands(
                    newCommand, 
                    oldObject.commandDescription, 
                    oldObject.callback, 
                    oldObject.argumentsToPass,
                    oldCommand.functionType)
            }
        }

        function cleanCommand( word ) {
            let neatString = word.toLowerCase()
            //remove punctuation and any symbols.
            return neatString.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "")
        }

        function createRegexExpression( cleanWord ) {
            return new RegExp("[A-Z]*" + cleanWord + "[A-Z]*\\W*", "i")
        }

        //function that returns the hash as an array for display purposes
        function hashToArray(){

            //Will return array of arrays
            const objectToArray = Object.values(hash)

            return [].concat(...objectToArray)
        }

        //Add function to check for commands and return what is needed.
        function checkForCommand( transcript ) {

            if(transcript === undefined){
                return
            }

            const lastPosition = transcript.lastIndexOf(' ')

            //index of first letter
            const firstLetterIndex = lastPosition + 1

            const lastWord = transcript.substring(lastPosition + 1)

            //index of last letter 
            const lastLetterIndex = firstLetterIndex + lastWord.length + 1
            
            const lastLetter = lastWord[lastWord.length - 1]
            
            if(hash[lastLetter]){
                for (let x = 0; x < hash[lastLetter].length; x++){
                    
                    if(hash[lastLetter][x].regex.test(lastWord)){
                        //check what you need refactor this once you know exactly what you need

                        //TODO
                        //need to return the index of the first and last letter aswell
                        return {
                            ...hash[lastLetter][x],
                            lastLetterIndex,
                            firstLetterIndex
                        }
                    }
                }
            }
            return
        }

    return [hash, {addToCommands, removeCommand, changeCommand, checkForCommand, hashToArray}]
}





