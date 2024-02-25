const httpError = require('http-errors')
const CommandsModel = require('../../model/CommandsModel')

const CommandModel = new CommandsModel()

module.exports = class CommandsService {


    async getCommands(){
        try{
            //change to get commands 
            const response = await CommandModel.addCommand()

            if(!response){
                throw httpError(404, 'Resource not found')
            }
            return response
        }
        catch(err){
            if(err.status){
                throw err
            }
            console.log(err)
            throw httpError(500, 'Internal server error')
        }
    }
    async saveCommands(userId, commands){
        try{
            const response = await CommandModel.addCommand(userId, commands)

            if(!response){
                throw httpError(500, 'Internal server error')
            }
        }
        catch(err){
            if(err.status){
                throw err
            }
            console.log(err)
            throw httpError(500, 'Internal server error')
        }
        
    }
}