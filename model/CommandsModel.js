const db = require('./db')

module.exports = class CommandsModel {

    //Add Commands To Database.
    /**
     * @param {JSON} commands 
     * @returns {INT||Error} 0 added || error 
     */

    async addCommand() {
        try{
            const response = await db.query('SELECT * FROM commands')

            return response.rows
        }
        catch(err){
            throw new Error(err)
        }
    }
}