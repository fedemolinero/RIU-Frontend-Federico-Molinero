import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { HeroService } from '../../services/hero.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', [
      'getHeroById',
      'addHero',
      'updateHero',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      paramMap: of({
        get: (key: string) => (key === 'id' ? '1' : null),
        has: (key: string) => key === 'id',
        getAll: (key: string) => (key === 'id' ? ['1'] : []),
        keys: ['id'],
      } as ParamMap),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HeroFormComponent,
        BrowserAnimationsModule,
      ],
      declarations: [],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with hero data if id is provided', () => {
    const hero = { id: 1, name: 'Test Hero', description: 'Test Description' };
    mockHeroService.getHeroById.and.returnValue(hero);

    component.ngOnInit();

    expect(component.heroForm.value).toEqual({
      name: 'Test Hero',
      description: 'Test Description',
    });
    expect(component.heroId).toBe(1);
  });

  it('should call addHero when saving a new hero', () => {
    component.heroForm.setValue({
      name: 'New Hero',
      description: 'New Description',
    });
    component.heroId = null;

    component.saveHero();

    expect(mockHeroService.addHero).toHaveBeenCalledWith({
      id: 0,
      name: 'New Hero',
      description: 'New Description',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('should call updateHero when saving an existing hero', () => {
    component.heroForm.setValue({
      name: 'Updated Hero',
      description: 'Updated Description',
    });
    component.heroId = 1;

    component.saveHero();

    expect(mockHeroService.updateHero).toHaveBeenCalledWith({
      id: 1,
      name: 'Updated Hero',
      description: 'Updated Description',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('should not save if the form is invalid', () => {
    component.heroForm.setValue({ name: '', description: '' });

    component.saveHero();

    expect(mockHeroService.addHero).not.toHaveBeenCalled();
    expect(mockHeroService.updateHero).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
