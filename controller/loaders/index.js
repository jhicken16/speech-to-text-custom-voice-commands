const routerLoader = require('../routes')
const express = require('./express')
const passport = require('./passport')

module.exports = (app, database) => {

    express(app)
    const pass = passport(app, database)
    routerLoader(app, pass, database)

    //Error middleware
    app.use((err, req, res, next) => {
        console.log(err)
        const {message, status} = err
        return res.status(status).json({message: message})
    })
}