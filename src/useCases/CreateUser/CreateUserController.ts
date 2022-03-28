import { Request, Response } from "express";
import { CreateUserUseCases } from "./CreateUserUseCase";

export class CreateUserController{
    private createUserUseCases : CreateUserUseCases;
    constructor(createUserUseCase : CreateUserUseCases){
        this.createUserUseCases = createUserUseCase;
    }
    async execute(request: Request, response: Response) : Promise<Response>{
        const {name, email, password, avatar} = request.body;

        try{
            await this.createUserUseCases.execute({
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