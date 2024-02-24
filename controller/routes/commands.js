const express = require('express')
const router = express.Router()

module.exports = (app) => {
    app.use('/commands', router)

    router.post('', async (request, response, next) => {
        //TODO
        response.status(200).send({message: 'just testing some think'})
    })
}