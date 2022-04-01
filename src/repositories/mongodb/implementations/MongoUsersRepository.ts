import { ObjectId } from "mongodb";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../Users/IUsersRepository";
import { MongoHelper } from "../helpers/mongo-helper";

interface IMongoUser {   
    _id: ObjectId
    id: string
    name: string
    email: string
    password: string
    avatar: string
    
    
}

export class MongoUsersRepository implements IUsersRepository{

    async findByEmail(email: string): Promise<User | any> {

        const userCollection = await MongoHelper.getCollection('users')
        
        const user = await userCollection.findOne<IMongoUser>({email: email})
       
        return user

    }

    async save(user: User): Promise<void> {
       
       const userCollection = await MongoHelper.getCollection('users')
       
       await userCollection.insertOne(user)

    }

    async signin(email: string, password: string) : Promise<User | null> {
        
        const userCollection = await MongoHelper.getCollection('users')

        const user = await userCollection.findOne<IMongoUser>({
            email,
            password
        })

        if(user){
            return user
        }
        return null
    }
}