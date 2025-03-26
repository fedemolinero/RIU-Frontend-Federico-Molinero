import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[uppercase]',
  standalone: true,
})
export class UppercaseDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target as HTMLInputElement;
    const uppercasedValue = input.value.toUpperCase();
    input.value = uppercasedValue;

    // Update the form control value
    if (this.control && this.control.control) {
      this.control.control.setValue(uppercasedValue, { emitEvent: false });
    }
  }
}
