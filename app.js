const express = require('express')
const { PORT } = require('./config')

module.exports = (database) => {

    const loaders = require('./controller/loaders')

    const app = express()

    loaders(app, database)

    return app

}

