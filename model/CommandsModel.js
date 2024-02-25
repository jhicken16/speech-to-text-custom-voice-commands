const db = require('./db')

module.exports = class CommandsModel {

    //Add Commands To Database.
    /**
     * @param {JSON} commands 
     * @returns {INT||Error} 0 added || error 
     */

    async addCommand(userId, commands) {

        const statement = `INSERT INTO commands
                            (user_id, commands)
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
}