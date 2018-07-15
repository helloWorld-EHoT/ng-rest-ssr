import {Pipe, PipeTransform} from '@angular/core';
import { IUser } from '../models/user.model';

@Pipe({
  name: 'isOnline'
})
export class OnlinePipe implements PipeTransform {

  transform(input: IUser[]) {

    if (typeof input === 'undefined' || typeof input === null) {
      return '';
    } else {
      // const lineFeed: string = input.split('\n').join('<br />');
      // return this.checkContainsElementsInside(lineFeed);
    }
  }

  checkIfUserIsOnline(user: IUser) {

  }
}
