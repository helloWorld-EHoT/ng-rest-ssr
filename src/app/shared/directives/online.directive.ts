
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[benamixOnline]'
})
export class OnlineDirective {

  constructor(elem: ElementRef, renderer: Renderer2) {

  }
}
