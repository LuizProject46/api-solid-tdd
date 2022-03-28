import { uuid } from 'uuidv4';

export class User {

    public readonly id: string | undefined;

    public name: string;
    public email: string;
    public password: string;
    public avatar: string;


    constructor(props: Omit<User, 'id'>, id?: string){
        
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.avatar = props.avatar;

        if(!id){
            this.id = uuid();
        }
    }
}