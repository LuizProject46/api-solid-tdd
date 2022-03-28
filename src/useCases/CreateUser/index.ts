import { MailtrapMailProvider } from "../../providers/implementations/MailTrapProvider";
import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCases } from "./CreateUserUseCase";

const mailTrapMailProvider  =  new MailtrapMailProvider();
const mongoRepository = new MongoUsersRepository();

const createUserUseCases = new CreateUserUseCases(
    mongoRepository,
    mailTrapMailProvider
)

const createUserController = new CreateUserController(createUserUseCases);


export {
    createUserUseCases,
    createUserController
}