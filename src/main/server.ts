import express, {json, Request, Response} from 'express'
import routes from './routes/routes'
import mongoose from 'mongoose'

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, PORT } = process.env

const app = express()

app.use(routes)
// mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)

// mongoose.connection.on('error', () => console.error('connection error'))
// mongoose.connection.once('open', () => console.log('database connected'))

app.get('/', (request: Request, response: Response) => {
    return response.json({
        message: "Hello World"
    })
})


app.listen(PORT, () => {
    console.log("API is running...")
})