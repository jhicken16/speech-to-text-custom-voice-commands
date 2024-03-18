const startApp = require('./app')
const { PORT } = require('./config')
const db = require('./model/db')

const app = startApp(db)

app.listen(PORT, () => {
    console.log(`Server running on prot: ${PORT}`)
})