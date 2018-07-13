import {Pipe, PipeTransform} from '@angular/core';

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const urlSorter = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})/;

@Pipe({
    name: 'prettyPrint'
})
export class PrettyPrintPipe implements PipeTransform {

    transform(input: string) {

        if (typeof input === 'undefined' || typeof input === null) {
            return '';
        } else {
            const lineFeed: string = input.split('\n').join('<br />');
            return this.checkContainsElementsInside(lineFeed);
        }
    }

    checkContainsElementsInside(string) {

        const bold: string[] = string.split('*');
        let outputString: string = string;
        // if bold '*' contains
        if (bold.length > 2) {
            bold.forEach((bolder, index, array) => {
                if (index % 2 && index !== array.length - 1) {
                    array[index] = `<b>${bolder}</b>`;
                }
            });
            outputString = bold.join('');
        }
        // if italic '~' contains
        const italic: string[] = outputString.split('~');
        if (italic.length > 2) {
            italic.forEach((italicized, index, array) => {
                if (index % 2 && index !== array.length - 1) {
                    array[index] = `<i>${italicized}</i>`;
                }
            });
            outputString = italic.join('');
        }
        // if message contains emails
        const mailString: RegExp = emailPattern;
        const urlString: RegExp = urlPattern;
        const urlShortener: RegExp = urlSorter;
        const searchEmails: string[] = outputString.split(' ');
        if (searchEmails.length) {
            searchEmails.forEach((part, index, array) => {
                if (mailString.test(part)) {
                    array[index] = `<a href="mailto:${part}">${part}</a>`;
                } else if (urlString.test(part)) {
                    const shortUrl = urlShortener.exec(part)[0];
                    console.log(shortUrl);
                    array[index] = `<a href="${part}" title="${part}" target="_blank">${shortUrl}</a>`;
                }
            });
            outputString = searchEmails.join(' ');
        }

        return outputString;
    }
}
