const httpError = require('http-errors')
const CommandsModel = require('../../model/CommandsModel')

const CommandModel = new CommandsModel()

module.exports = class CommandsService {


    async getCommands(){
        try{
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
}