const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = (app) => {

    app.use(cors({
        //change to environment variable
        origin: "http://localhost:3000",
        
        //just for now
        credentials: true
    }))

    app.use(bodyParser.json())

}