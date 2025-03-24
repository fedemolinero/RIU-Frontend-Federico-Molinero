import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial state of false', (done) => {
    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    });
  });

  it('should emit true when show is called', (done) => {
    const emittedValues: boolean[] = [];
    service.isLoading$.subscribe((isLoading) => {
      emittedValues.push(isLoading);
      if (emittedValues.length === 2) {
        expect(emittedValues).toEqual([false, true]);
        done();
      }
    });
    service.show();
  });

  it('should emit false when hide is called after show', (done) => {
    const emittedValues: boolean[] = [];
    service.isLoading$.subscribe((isLoading) => {
      emittedValues.push(isLoading);
      if (emittedValues.length === 3) {
        expect(emittedValues).toEqual([false, true, false]);
        done();
      }
    });
    service.show();
    service.hide();
  });

  it('should not emit duplicate values if show is called multiple times', (done) => {
    const emittedValues: boolean[] = [];
    service.isLoading$.subscribe((isLoading) => {
      emittedValues.push(isLoading);
      if (emittedValues.length === 2) {
        expect(emittedValues).toEqual([false, true]);
        done();
      }
    });
    service.show();
    // Calling show again should not emit a duplicate value
    service.show(); 
  });

});
