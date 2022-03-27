import  { Request, Response} from 'express'
import { app } from './app'

const { PORT } = process.env


app.listen(PORT, () => {
    console.log("API is running...")
})