import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { LoadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', [
      'show',
      'hide',
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true,
        },
        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loadingService = TestBed.inject(
      LoadingService
    ) as jasmine.SpyObj<LoadingService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call show and hide on LoadingService', () => {
    loadingService.show.calls.reset();
    loadingService.hide.calls.reset();

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(loadingService.show).toHaveBeenCalledTimes(1);

    req.flush({}); // Simulate response
    expect(loadingService.hide).toHaveBeenCalledTimes(1);
  });
});
