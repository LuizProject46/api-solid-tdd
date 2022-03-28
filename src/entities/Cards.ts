import { uuid } from "uuidv4";
import { User } from "./User";

export class Card {
    public readonly id: string | undefined;

    public title: string;
    public description: string;
    public deadline: Date;
    public status: string;
    public order: number;
    public owner: User;

    constructor( { title, description, deadline, status, order, owner  } : Omit<Card, 'id'>, id?: string){
        
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
        this.order = order;
        this.owner = owner;

        if(!id){
            this.id = uuid();
        }

    }
}