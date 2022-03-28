import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/Email/IMailProvider";
import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCases {

    private usersRepository: IUsersRepository;
    private mailProvider : IMailProvider;

    constructor(
        usersRepository: IUsersRepository,
        mailProvider: IMailProvider
    ) {
        this.usersRepository = usersRepository;
        this.mailProvider = mailProvider;
    }

    async execute(data: CreateUserRequestDTO){

        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists){
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        this.mailProvider.sendMail({
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

    }
}