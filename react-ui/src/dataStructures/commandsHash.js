/*
I need a very quick look up time. 

array length based on number of potential inputs the user my use base on symbols on the key board * 1.3 

Or i just make it an object for constant look up time
*/

export default class CommandsHash{
    constructor(){
        //this.hash = new Array(45).fill(null)
        this.commands = {}
    }
    addToCommands(state, setState, commandDescription, callback, argumentsToPass){
        this.commands[state] = {
            command: state,
            setState,
            description: commandDescription,
            callback,
            arguments
        }
    }
    changeCommand(newCommand, oldCommand){
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




    //NO! would have to loop though the hole string to get key
    // HashFunction(str){
    //     let hash = 5381;
    //     for (let i = 0; i < str.length; i++) {
    //         hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    //     }
    //     return hash % 46;  // Ensure the result is between 0 and 45
    // }
}