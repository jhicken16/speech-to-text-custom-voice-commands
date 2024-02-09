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

export default class CommandsHash{
    constructor(){
        //this.hash = new Array(45).fill(null)
        this.commands = {}
    }
    addToCommands(command, commandDescription, callback, argumentsToPass){
        
        command = this.cleanCommand(command)
        const regex = this.createRegexExpression(command)

        if(this.commands[command[command.length - 1]]){
            //add traverse linked list and to end
        }
        else{
            //create new object and set it === to node in linked list.
        }
        
        
        
        
        
        
        
        const ToPassIntoLinkedList = {
            command,
            regex,
            description: commandDescription,
            callback,
            arguments
        }
    }
    changeCommand(newCommand, oldCommand){

        //TODO - Also change regex expression

        this.commands[newCommand] = this.commands[oldCommand]
        delete this.commands[oldCommand]
    }
    changeFunction(command, callback, argumentsToPass){
        this.commands[command].callback = callback
        this.commands[command].arguments = argumentsToPass
    }
    removeCommand(command){
        delete this.commands[command]
    }
    cleanCommand(word){
        let neatString = word.toLowerCase()
        //remove puctuation and any symbols.
        return neatString.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "")
    }
    createRegexExpression(cleanWord){
        return new RegExp("[A-Z]*" + cleanWord + "[A-Z]*\\W*", "i")
    }
}