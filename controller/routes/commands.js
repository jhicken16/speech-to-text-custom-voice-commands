const express = require('express')
const router = express.Router()

const CommandsServices = require('../services/CommandsService')

const Commands = new CommandsServices()

module.exports = (app) => {
    app.use('/commands', router)

    router.post('', async (request, response, next) => {
        //TODO
        const data = request.body
        console.log(data)
        console.log(await Commands.getCommands())
        response.status(200).send({message: 'just testing some think'})
    })
}