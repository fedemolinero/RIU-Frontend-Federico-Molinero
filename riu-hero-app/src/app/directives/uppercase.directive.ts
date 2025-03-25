import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[uppercase]',
  standalone: true,
})
export class UppercaseDirective {
  constructor(public ref: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const uppercasedValue = event.target.value.toUpperCase();
    this.ref.nativeElement.value = uppercasedValue;
    this.ref.nativeElement.dispatchEvent(new Event('input'));
  }
}
