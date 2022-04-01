import  { Request, Response} from 'express'
import { MongoHelper } from '../repositories/mongodb/helpers/mongo-helper'
import { app } from './app'



const { PORT, MONGO_URL } = process.env

MongoHelper.connect(MONGO_URL)
.then(async () => {
    app.listen(PORT, () => {
        console.log("API is running...")
    })
}).catch(console.error)

