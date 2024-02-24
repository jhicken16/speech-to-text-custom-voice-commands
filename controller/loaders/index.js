const routerLoader = require('../routes')

module.exports = (app) => {

    routerLoader(app)

    //Error middleware
    app.use((err, req, res, next) => {
        console.log(err)
        const {message, status} = err
        return res.status(status).json({message: message})
    })
}