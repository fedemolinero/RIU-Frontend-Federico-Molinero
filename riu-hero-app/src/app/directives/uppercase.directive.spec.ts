import { UppercaseDirective } from './uppercase.directive';
import { NgControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `<input [(ngModel)]="testInput" appUppercase />`,
})
class TestComponent {
  testInput: string = '';
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UppercaseDirective, TestComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: NgControl, useValue: { control: { setValue: jasmine.createSpy('setValue') } } }],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('should convert input value to uppercase', () => {
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('TEST');
  });
});
