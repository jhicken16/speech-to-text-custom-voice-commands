const httpError = require('http-errors')
const CommandsModel = require('../../model/CommandsModel')

const CommandModel = new CommandsModel()

module.exports = class CommandsService {


    async getCommands(id){
        try{
            //change to get commands 
            const response = await CommandModel.getUsersCommands(id)

            if(!response){
                throw httpError(404, 'Resource not found')
            }
            return response
        }
        catch(err){
            if(err.status){
                throw err
            }
            throw httpError(500, 'Internal server error')
        }
    }
    async saveCommands(userId, commands){
        try{
            const doesUserExist = await CommandModel.getUsersCommands(userId)

            let response = null
            console.log(commands)
            if(doesUserExist.length !== 0){
                response = await CommandModel.updateUsersCommands(userId, commands)
            }
            else{
                console.log('user did not exist')
                response = await CommandModel.addCommand(userId, commands)
            }

            if(!response){
                throw httpError(500, 'Internal server error')
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
}