// import { Pipe, PipeTransform } from '@angular/core';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//
// // import { EmoService } from '../services/emo.service';
//
// @Pipe({
//   name: 'emoPrint'
// })
// export class EmoPrintPipe implements PipeTransform {
//
//   constructor(private _sanitizer: DomSanitizer) {
//   }
//
//   transform(input: string): SafeHtml {
//
//     if (typeof input !== 'undefined' || typeof input !== null) {
//       const safeHTML = this.transformString(input.toString());
//       return this._sanitizer.bypassSecurityTrustHtml(safeHTML);
//     }
//     return this._sanitizer.bypassSecurityTrustHtml(input);
//
//   }
//
//   transformString(input: string): string {
//     const separator: RegExp = new RegExp(/(::)+/);
//     const inputArray: string[] = input.split(separator);
//     if (inputArray.length > 2) {
//       inputArray.forEach((elem, index, array) => {
//         if (index % 2 && index !== array.length - 1) {
//           if (!array[index - 1].length && !array[index + 1].length) {
//             array[index] = `<i class="emo sm benamix-sm-${elem}"></i>`;
//
//           } else {
//             array[index] = `<i class="emo xsm benamix-xsm-${elem}"></i>`;
//           }
//         }
//       });
//     }
//     return inputArray.join('');
//   }
// }
