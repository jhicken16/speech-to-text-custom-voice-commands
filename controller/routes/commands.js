const express = require('express')
const router = express.Router()
const { checkAuthentication } = require('../utility/helpers')

const CommandsServices = require('../services/CommandsService')



module.exports = (app, database) => {

    const Commands = new CommandsServices(database)
    app.use('/commands', router)

    router.post('', checkAuthentication, async (request, response, next) => {
        //TODO
        const {id} = request.user
        
        try{
            const getCommands = await Commands.getCommands(id)
            console.log(getCommands)
            response.status(200).send(getCommands)
        }
        catch(err){
            next(err)
        }
    })

    router.put('', checkAuthentication, async (request, response, next) => {
        const { id } = request.user
        const { commandsArray } = request.body

        try{

            const comList = await Commands.saveCommands(id, commandsArray)
            console.log(comList)

            response.status(200).send(comList)

        }
        catch(err){
            next(err)
        }
    })
}