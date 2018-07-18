import {Pipe, PipeTransform} from '@angular/core';
import { IMessage } from '../models/message.model';

@Pipe({
  name: 'chatMessage'
})
export class ChatMessagePipe implements PipeTransform {

  transform(input: IMessage[], chatId: string) {

    if (typeof input === 'undefined' || typeof input === null) {
      return [];
    } else {
      const output: IMessage[] = [];
      input.forEach((chatMessage) => {
        if (chatMessage.chat_id === chatId) {
          output.push(chatMessage);
        }
      });

      return output;

      // input.map(data => data.filter(message => message.chat_id === chatId));
      // const lineFeed: string = input.split('\n').join('<br />');
      // return this.checkContainsElementsInside(lineFeed);
    }
  }
}
