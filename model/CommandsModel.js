const db = require('./db')

module.exports = class CommandsModel {

    //Add Commands To Database.
    /**
     * @param {JSON} commands 
     * @returns {INT||Error} 0 added || error 
     */

    async addCommand(userId, commands) {
    
        commands = JSON.stringify({
            commands: commands
        })
        
        const statement = `INSERT INTO commands
                            (user_id, command_data)
                            VALUES ($1, $2)
                            RETURNING *;`
        const values = [userId, commands]

        try{
            const response = await db.query(statement, values)
            
            if(response.rows === 0){
                return null
            }

            return response.rows
        }
        catch(err){
            throw new Error(err)
        }
    }

    async updateUsersCommands(userId, commands){

        commands = JSON.stringify({
            commands: commands
        })

        const statement = `UPDATE commands
                            SET command_data = $1
                            WHERE user_id = $2
                            RETURNING *;`
        const values = [commands, userId]

        try{
            const response = await db.query(statement, values)
            if(!response){
                return null
            }
            return response.rows
        }
        catch(err){
            throw new Error(err)
        }
    }


    async getUsersCommands(userId){
        const statement = `SELECT * FROM commands WHERE user_id = $1`
        const value = [userId]

        try{
            const response = await db.query(statement, value)

            if(response.rows === 0){
                return null
            }

            return response.rows
        }
        catch(err){
            throw new Error(err)
        }

    }
}