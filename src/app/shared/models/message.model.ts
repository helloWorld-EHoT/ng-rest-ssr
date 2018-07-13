export interface IMessage {
    _id?: string;
    sender: string;
    sender_id: string;
    content: string;
    date?: string;
    chat_id: string;
    read: boolean;
    // to delete
    type?: string;
    id?: string;
}
