const httpError = require('http-errors')
const bcrypt = require('bcrypt')

const usersModel = require('../../model/UsersModel')

module.exports = class AuthService {
    constructor(database){
        this.Users = new usersModel(database)
    }

    async register(data) {
        
        //check if user already exists.
        const { email } = data

        try{
            const doesEmailExist = await this.Users.findByEmail(email)

            if(doesEmailExist){
                throw httpError(409, 'Email already in use.')
            }

            //user doesn't exist create new user.
            return await this.Users.createCustomer(data)
        }
        catch(err){
            if(err.status){
                throw err
            }
            console.log(err)
            throw httpError(500, 'Internal server error')
        }
        
    }

    async login(data) {
        const { email } = data

        try{
            const userRow = await this.Users.findByEmail(email)

            if(!userRow){
                throw httpError(401, 'no rows')
            }

            const match = await bcrypt.compare(data.password, userRow[0].password)
            if (!match){
                throw httpError(401, 'email or username is incorrect')
            }
            //everything from row including hash
            return userRow[0]
        }
        catch(err){
            throw httpError(err)
        }
    }
}