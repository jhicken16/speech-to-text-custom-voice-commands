const bcrypt = require('bcrypt')

module.exports = class CustomerModel {
    //Find one by email 
    /**
     * @param {STRING} email 
     * @returns {Object|null} Users row if found || null if user not found
     */

    constructor(database){
        this.db = database
    }

    async findByEmail(email) {

        try{ 
            const response = await this.db.query('SELECT * FROM users WHERE email = $1', [email])
            if(response.rows.length === 0){
                
                return null
            }
            
            return response.rows
        }
        catch(err){
            throw new Error(err)
        }
    }

    //Insert new user into the customer table.
    /**
     * @param {Object} data contains {email, name, password} 
     * 
     */
    async createCustomer(data) {
        
        //hash password before inserting into table
        const salt = await bcrypt.genSalt(10)
        data.password = await bcrypt.hash(data.password, salt)
        
        try{
            const response = await this.db.query('INSERT INTO users(email, password) VALUES($1, $2) RETURNING id, email', 
                [data.email, data.password]);
            return response.command
        }
        catch(err){
            throw new Error(err)
        }
    }

    async customerById(id) {

        try{
            const response = await this.db.query('Select * FROM users WHERE id = $1',
            [id])
            if (response.rows.length === 0){
                return null 
            }
            return response.rows

        }
        catch(err){
            throw new Error(err)
        }
    }

    async allUsers() {

        try{
            const response = await this.db.query('SELECT email FROM users')
            if (response.rows.length === 0){
                return null
            }
            return response.rows
        }
        catch(err){
            throw new Error(err)
        }
    }
    
}