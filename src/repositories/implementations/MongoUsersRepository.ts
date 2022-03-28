import { User } from "../../entities/User";
import { IUsersRepository } from "../Users/IUsersRepository";

export class MongoUsersRepository implements IUsersRepository{
    async findByEmail(email: string): Promise<User> {
        const user = {id: "1", name: "Luiz", email: "email", password: "123", avatar: ""};

        return user;
    }

    async save(user: User): Promise<void> {
        //save on mongoDB
    }
}