const express = require('express')
const router = express.Router()

module.exports = (app) => {
    app.use('/transcribe', router)

    router.post('', async (request, response, next) => {
        
    })
}