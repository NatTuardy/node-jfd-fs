const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const path = require('path')
const cors = require('cors')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()

const PORT = config.get('port') ?? 8080

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api', routes)

// if(process.env.NODE_ENV === 'production') {
//     console.log('production')
// } else {
//     console.log('development')
// }http://localhost:8080/api/quality

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')))

    const indexPath = path.join(__dirname, 'client', 'index.html')

    app.get('*', (req, res)=> {
        res.send(indexPath)
    })
}

async function start (){
    try {
        mongoose.connection.once('open', ()=> {
            initDatabase()
        })
        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.white('MongoDB connected'))
        app.listen(PORT, ()=> {
            console.log(chalk.green(`Server has been started on port ${PORT}...`))
        })
    } catch (error) {
        console.log('xyi')
        console.log(chalk.red(error.message))
        process.exit(1)
        
    }
}

start()


