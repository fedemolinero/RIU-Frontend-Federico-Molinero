import { UppercaseDirective } from './uppercase.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  template: `<input [(ngModel)]="testInput" appUppercase />`,
})
class TestComponent {
  testInput: string = '';
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;
  let directive: UppercaseDirective;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UppercaseDirective, FormsModule],
      providers: [
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
    directive = new UppercaseDirective(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should convert input value to uppercase', () => {
    const mockEvent = {
      target: {
        value: 'test',
      },
    };
    directive.onInput(mockEvent);
    expect(mockElementRef.nativeElement.value).toBe('TEST');
  });
});
