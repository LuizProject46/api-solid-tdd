import { MongoUsersRepository } from "../../repositories/mongodb/implementations/MongoUsersRepository";
import { SigninController } from "./SigninController";
import { SigninUseCase } from "./SigninUseCase";

const mongoUsersRepository = new MongoUsersRepository()

const signinUseCase = new SigninUseCase(
    mongoUsersRepository
)

const signinController = new SigninController(
    signinUseCase
)

export {
    signinUseCase,
    signinController
}


