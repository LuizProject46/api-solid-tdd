import { Request, Response } from "express";
import { SignupUseCases } from "./SignupUseCase";

export class SignupController{
    private signupUseCases : SignupUseCases;
    constructor(signupUseCase : SignupUseCases){
        this.signupUseCases = signupUseCase;
    }
    async execute(request: Request, response: Response) : Promise<Response>{
        const {name, email, password, avatar} = request.body;

        try{
            await this.signupUseCases.execute({
                name,
                email, 
                password,
                avatar
            })
    
            return response.status(201).send({
                message: "User was created!"
            })
        }catch(err: any){
            return response.status(400).send({
                message: err.message || "Unexpected Error"
            })
        }
       
    }
}