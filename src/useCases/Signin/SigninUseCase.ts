import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { SigninRequest } from "./SigninDTO";
import jtw from 'jsonwebtoken'

export class SigninUseCase {
    private userRepository: IUsersRepository

    constructor(
        userReposistory: IUsersRepository
    ){
        this.userRepository = userReposistory
    }

    async execute(data: SigninRequest){

        const user = await this.userRepository.signin(data.email, data.password)
        const secret = process.env.JWT_SECRET || ""

    
        if(user){

            const token =  jtw.sign({
                userId: user.id,
                name: user.name,               
            }, secret, {
                algorithm : "HS256",
                expiresIn: '1h'
            })

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                token,
                status: 201

            }
        }


        return {
            message : 'User not found',
            status: 401
        }
    }
}