const express = require('express')
const router = express.Router()
const { checkAuthentication } = require('../utility/helpers')

const CommandsServices = require('../services/CommandsService')

const Commands = new CommandsServices()

module.exports = (app) => {
    app.use('/commands', router)

    router.post('', checkAuthentication, async (request, response, next) => {
        //TODO
        const data = request.body
        console.log(data)
        console.log(await Commands.getCommands())
        response.status(200).send({message: 'just testing some think'})
    })

    router.put('', checkAuthentication, async (request, response, next) => {
        const { id } = request.user
        const { commands } = request.body

        try{

            const comList = await CommandsServices.saveCommands(id, commands)
            console.log(comList)

            response.status(200).send(comList)

        }catch(err){
            next(err)
        }
    })
}