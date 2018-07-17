// import { Pipe, PipeTransform } from '@angular/core';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { EmoService } from '../services/emo.service';
//
// @Pipe({
//   name: 'emoPrint'
// })
// export class EmoPrintPipe implements PipeTransform {
//
//   constructor(private _sanitizer: DomSanitizer,
//               private emo: EmoService) {
//     const data = this.emo.getData();
//   }
//
//   transform(input: string): SafeHtml {
//
//     if (typeof input === 'undefined' || typeof input === null) {
//       return '';
//     } else {
//       const lineFeed: string = input.split('\n').join('<br />');
//       // return this.checkContainsElementsInside(lineFeed);
//       const safeHTML = this.transformString(lineFeed);
//       return this._sanitizer.bypassSecurityTrustHtml(safeHTML);
//     }
//   }
//
//   transformString(input: string) {
//     const separator = '::';
//     const inputArray: string[] = input.split(separator);
//     if (inputArray.length > 2) {
//       inputArray.forEach((elem, index, array) => {
//         if (index % 2 && index !== array.length - 1) {
//           array[index] = `<i class="${elem}"></i>`;
//         }
//       });
//     }
//     return inputArray.join('');
//   }
// }
