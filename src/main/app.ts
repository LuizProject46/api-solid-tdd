import { router } from './routes/routes'
import express from 'express'

const app = express()

app.use(express.json())
app.use(router)


export { app }