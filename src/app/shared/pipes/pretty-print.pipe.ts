import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const urlSorter = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})/;

@Pipe({
    name: 'prettyPrint'
})
export class PrettyPrintPipe implements PipeTransform {

    public regexpStart: RegExp;
    public regexpEnd: RegExp;

    constructor(private _sanitizer: DomSanitizer) {
       this.regexpStart = new RegExp(/"quote-start"+/g);
       this.regexpEnd = new RegExp(/"quote-end"+/g);
    }

    transform(input: string): SafeHtml {

        if (typeof input === 'undefined' || typeof input === null) {
            return '';
        } else {
            const lineFeed: string = input.split('\n').join('<br />');
            // return this.checkContainsElementsInside(lineFeed);
            const safeHTML = this.checkContainsElementsInside(lineFeed);
            return this._sanitizer.bypassSecurityTrustHtml(safeHTML);
        }
    }



    transformString(input: string, separator: string, tag: string) {
        const inputArray: string[] = input.split(separator);
        if (separator === 'quote-start') {

            return input.replace(this.regexpStart, tag);

        } else if (separator === 'quote-end') {

            return input.replace(this.regexpEnd, tag);

        } else {
            if (inputArray.length > 2) {
                inputArray.forEach((elem, index, array) => {
                    if (index % 2 && index !== array.length - 1) {
                      if (tag === 'emo') {
                        if (!array[index - 1].length && !array[index + 1].length) {
                          array[index] = `<i class="emo sm benamix-sm-${elem}"></i>`;
                        } else {
                          array[index] = `<i class="emo xsm benamix-xsm-${elem}"></i>`;
                        }

                      } else {
                        array[index] = `<${tag}>${elem}</${tag}>`;
                      }
                    }
                });
            }
            return inputArray.join('');
        }
    }

    checkContainsElementsInside(inputString: string) {
        let outputString: string;

        // if bold '*' contains
        outputString = this.transformString(inputString, '*', 'b');
        // if italic '~' contains
        outputString = this.transformString(outputString, '~', 'i');
        // if headers '^' contains
        outputString = this.transformString(outputString, '^', 'h3');
        // if underlined '_' contains
        outputString = this.transformString(outputString, '_', 'u');
        // if sub '\' contains
        outputString = this.transformString(outputString, ',,', 'sub');
        // if sup '/' contains
        outputString = this.transformString(outputString, '``', 'sup');
        // if stroked '--' contains
        outputString = this.transformString(outputString, '--', 'strike');
      // if stroked '::' contains
      outputString = this.transformString(outputString, '::', 'emo');

        if (this.regexpStart.test(outputString) && this.regexpEnd.test(outputString)) {
            // if stroked '&laquo;' contains
            console.log(outputString);
            outputString = this.transformString(outputString, 'quote-start', '<div class="quote">');
            console.log(outputString);
            outputString = this.transformString(outputString, 'quote-end', '</div>');
            console.log(outputString);
        }

        // if messageTextField contains emails
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
