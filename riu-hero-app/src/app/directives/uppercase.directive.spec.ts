import { UppercaseDirective } from './uppercase.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';

@Component({
  template: `<input [(ngModel)]="testInput" appUppercase />`,
})
class TestComponent {
  testInput: string = '';
}

class MockNgControl extends NgControl {
  control = {
    setValue: jasmine.createSpy('setValue'),
  } as any;
  viewToModelUpdate() {}
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;
  let directive: UppercaseDirective;
  let mockElementRef: ElementRef;
  let mockNgControl: MockNgControl;

  beforeEach(() => {
    mockNgControl = new MockNgControl();

    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FormsModule],
      providers: [
        { provide: NgControl, useValue: mockNgControl },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector('input');

    mockElementRef = {
      nativeElement: {
        value: '',
      },
    } as ElementRef;
    directive = new UppercaseDirective(mockElementRef, mockNgControl);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should transform input value to uppercase', () => {
    mockElementRef.nativeElement.value = 'test';
    directive.onInput({ target: mockElementRef.nativeElement });

    expect(mockElementRef.nativeElement.value).toBe('TEST');
    expect(mockNgControl.control.setValue).toHaveBeenCalledWith('TEST', { emitEvent: false });
  });

  it('should not throw error if NgControl is not provided', () => {
    const directiveWithoutNgControl = new UppercaseDirective(mockElementRef, null as any);
    mockElementRef.nativeElement.value = 'test';
    directiveWithoutNgControl.onInput({ target: mockElementRef.nativeElement });

    expect(mockElementRef.nativeElement.value).toBe('TEST');
  });

});
