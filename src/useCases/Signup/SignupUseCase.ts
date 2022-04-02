import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/Email/IMailProvider";
import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { SignupRequestDTO } from "./SignupDTO";
import jtw from 'jsonwebtoken'

interface IUserLogged {
    id: string | undefined
    name: string
    email: string
    avatar: string
    token: string
}

export class SignupUseCases {

    private usersRepository: IUsersRepository;
    private mailProvider : IMailProvider;

    constructor(
        usersRepository: IUsersRepository,
        mailProvider: IMailProvider
    ) {
        this.usersRepository = usersRepository;
        this.mailProvider = mailProvider;
    }

    async execute(data: SignupRequestDTO): Promise<IUserLogged>{

        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        const secret = process.env.JWT_SECRET || ""

        if(userAlreadyExists){
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name : data.name,
                email: data.email
            },
            from: {
                name : "Equipe do meu app",
                email: "app@mail.com"
            },
            subject: "Cadastro realizado",
            body: "Olá, você foi cadastrado com sucesso!"
        })

        const token = jtw.sign({
            userId: user.id,
            name: user.name,               
        }, secret, {
            algorithm : "HS256",
            expiresIn: '1h'
        })

        return  { 
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,   
            token
        }

    }
}