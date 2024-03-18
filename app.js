const express = require('express')
const { PORT } = require('./config')

const loaders = require('./controller/loaders')

const app = express()

loaders(app)

module.exports = app