const commands = require('./commands')
const auth = require('./auth')

module.exports = (app, pass) => {

    auth(app, pass)
    commands(app)
    
}