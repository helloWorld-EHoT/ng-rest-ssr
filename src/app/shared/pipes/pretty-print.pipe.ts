import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'prettyPrint'
})
export class PrettyPrintPipe implements PipeTransform {

    transform(value: string[]) {

        if (typeof value === 'undefined' || typeof value === null) {
            return '';
        } else {
            return JSON.stringify(value, null, 2);
                // .replace(/ /g, '&nbsp;')
                // .replace(/\n/g, '<br/>');
        }
    }
}
