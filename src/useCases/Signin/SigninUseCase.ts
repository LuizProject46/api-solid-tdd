import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { SigninRequest } from "./SigninDTO";

export class SigninUseCase {
    private userRepository: IUsersRepository

    constructor(
        userReposistory: IUsersRepository
    ){
        this.userRepository = userReposistory
    }

    async execute(data: SigninRequest){
        const user = await this.userRepository.signin(data.email, data.password)

        if(user){
            return {
                token: 'tokens1111',
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                status: 201

            }
        }


        return {
            message : 'User not found',
            status: 401
        }
    }
}