const routerLoader = require('../routes')
const express = require('./express')
const passport = require('./passport')

module.exports = (app) => {

    express(app)
    const pass = passport(app)
    routerLoader(app, pass)

    //Error middleware
    app.use((err, req, res, next) => {
        console.log(err)
        const {message, status} = err
        return res.status(status).json({message: message})
    })
}