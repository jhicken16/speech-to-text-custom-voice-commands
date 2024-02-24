const routerLoader = require('../routes')
const express = require('./express')

module.exports = (app) => {

    express(app)
    routerLoader(app)

    //Error middleware
    app.use((err, req, res, next) => {
        console.log(err)
        const {message, status} = err
        return res.status(status).json({message: message})
    })
}