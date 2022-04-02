import { Request, Response } from "express";
import { SignupUseCases } from "./SignupUseCase";
import bcryptjs from 'bcryptjs'

export class SignupController{
    private signupUseCases : SignupUseCases;
    constructor(signupUseCase : SignupUseCases){
        this.signupUseCases = signupUseCase;
    }
    async execute(request: Request, response: Response) : Promise<Response>{
        const {name, email, password} = request.body;
        const image = request.file as Express.Multer.File

        try{ 

            const passwordEncoded = await bcryptjs.hash(password, 10)         

           const user =  await this.signupUseCases.execute({
                name,
                email, 
                password: passwordEncoded,
                avatar: image.filename
            })
            
 
            return response.status(201).send(user)

        }catch(err: any){
            return response.status(400).send({
                message: err.message || "Unexpected Error"
            })
        }
       
    }
}