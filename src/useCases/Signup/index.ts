import { MailtrapMailProvider } from "../../providers/implementations/MailTrapProvider";
import { MongoUsersRepository } from "../../repositories/mongodb/implementations/MongoUsersRepository";
import { SignupController } from "./SignupController";
import { SignupUseCases } from "./SignupUseCase";

const mailTrapMailProvider  =  new MailtrapMailProvider();
const mongoUsersRepository = new MongoUsersRepository();

const signupUseCases = new SignupUseCases(
    mongoUsersRepository,
    mailTrapMailProvider
)

const signupController = new SignupController(signupUseCases);


export {
    signupUseCases,
    signupController
}