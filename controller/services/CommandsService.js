const httpError = require('http-errors')
const CommandsModel = require('../../model/CommandsModel') 

module.exports = class CommandsService {

    constructor(database){
        this.CommandModel = new CommandsModel(database)
    }

    async getCommands(id){
        try{
            //change to get commands 
            const response = await this.CommandModel.getUsersCommands(id)

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
            const doesUserExist = await this.CommandModel.getUsersCommands(userId)

            let response = null
            console.log(commands)
            if(doesUserExist.length !== 0){
                response = await this.CommandModel.updateUsersCommands(userId, commands)
            }
            else{
                console.log('user did not exist')
                response = await this.CommandModel.addCommand(userId, commands)
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