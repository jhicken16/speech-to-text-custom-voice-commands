const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

const { SESSION_KEY } = require('../../config')

module.exports = (app) => {

    app.use(cors({
        //change to environment variable
        origin: "http://localhost:3000",
        
        //just for now
        credentials: true
    }))

    app.use(bodyParser.json())

    app.use(
        session({
            secret: SESSION_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1000 * 60 *60 * 24, secure: false, sameSite: "Strict"},
        })
    )

    app.use(bodyParser.json())

}