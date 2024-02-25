const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator')

//import classes to run auth.
const AuthService = require('../services/AuthService')
const Authentication = new AuthService()


module.exports = (app, passport) => {
    app.use('/auth', router)

    router.post('/register',
    [
        body('email').notEmpty().isString().isEmail().blacklist('<>,/?!`"{(;:'),
        body('password').notEmpty().isString()
    ] 
    ,async (request, response, next) => {
        console.log("hit")
        const result = validationResult(request)
        if ( !result.isEmpty()){
            return response.status(422).json({message: `Invalid input on ${result.path}`})
        }
        const data = request.body
        try {
            const res = await Authentication.register(data)
            console.log(res)
            response.status(200).send({message: 'ok'})
        } catch(err){
            next(err)
        } 
    })

    router.post('/login', passport.authenticate('local') ,async (request, response, next) => {
        
        const data = request.body
        console.log('login triggered')
        response.status(200).send({loggedIn: true})
    })
}