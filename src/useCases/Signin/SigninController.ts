import { Request, Response } from "express";
import { SigninUseCase } from "./SigninUseCase";

export class SigninController {
    private signinUseCase : SigninUseCase

    constructor(
        signinUseCase: SigninUseCase
    ){
        this.signinUseCase = signinUseCase
    }

    async execute(request: Request, response: Response): Promise<Response>{
        const { email, password } = request.body

        try{

            const result = await this.signinUseCase.execute({
                email,
                password
            })

            if(result.status == 401){
                return response.status(result.status).json(result)
            }

            return response.status(result.status).json(result)

        }catch(err: any){
            return response.status(401).json({
                message: err.message
            })
        }
    }
}