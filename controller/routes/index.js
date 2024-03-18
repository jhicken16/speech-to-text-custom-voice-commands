const commands = require('./commands')
const auth = require('./auth')

module.exports = (app, pass, database) => {

    auth(app, pass, database)
    commands(app, database)
    
}