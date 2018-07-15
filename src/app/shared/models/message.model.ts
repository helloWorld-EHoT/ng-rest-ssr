import { IUser } from './user.model';

export interface IMessage {
    _id?: string;
    sender: string;
    sender_id: string;
    content: string;
    date?: string;
    chat_id: IUser[] | string;
    read: boolean;
    // to delete
    type?: string;
    id?: string;
}
