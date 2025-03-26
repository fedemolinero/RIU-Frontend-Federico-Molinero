import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../../services/hero.service';
import { LoadingService } from '../../services/loading.service';
import { of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroServiceMock: jasmine.SpyObj<HeroService>;
  let loadingServiceMock: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    heroServiceMock = jasmine.createSpyObj('HeroService', [
      'getHeroes',
      'searchHeroes',
      'deleteHero',
    ]);
    loadingServiceMock = jasmine.createSpyObj(
      'LoadingService',
      ['show', 'hide'],
      { isLoading$: of(false) }
    );

    await TestBed.configureTestingModule({
      imports: [
        // Import the standalone component
        HeroListComponent, 
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        // Mock ActivatedRoute
        { provide: ActivatedRoute, useValue: {} }, 
        { provide: HeroService, useValue: heroServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

    it('should load heroes on initialization', () => {
      const mockHeroes = [
        { id: 1, name: 'Hero 1', description: 'Description 1' },
        { id: 2, name: 'Hero 2', description: 'Description 2' }
      ];
      heroServiceMock.getHeroes.and.returnValue(of(mockHeroes));

      component.ngOnInit();

      expect(component.heroes).toEqual(mockHeroes);
      expect(component.filteredHeroes).toEqual(mockHeroes);
      expect(component.noHeroesMessage).toBe('');
    });

    it('should filter heroes based on search query', () => {
      const mockHeroes = [
        { id: 1, name: 'Hero 1', description: 'Description 1' }
      ];
      heroServiceMock.searchHeroes.and.returnValue([mockHeroes[0]]);
      component.heroes = mockHeroes;
      heroServiceMock.searchHeroes.and.returnValue([mockHeroes[0]]);

      component.searchQuery = 'Hero 1';
      component.filterHeroes();

      expect(component.filteredHeroes).toEqual([mockHeroes[0]]);
      expect(component.noSearchResultsMessage).toBe('');
    });

    it('should show no search results message if no heroes match the query', () => {
      component.heroes = [{ id: 1, name: 'Hero 1', description: 'Description 1' }];
      heroServiceMock.searchHeroes.and.returnValue([]);

      component.searchQuery = 'Nonexistent Hero';
      component.filterHeroes();

      expect(component.filteredHeroes).toEqual([]);
      expect(component.noSearchResultsMessage).toBe('No heroes match your search.');
    });

    it('should paginate heroes correctly', () => {
      component.filteredHeroes = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Hero ${i + 1}`, description: `Description for Hero ${i + 1}` }));

      component.pageSize = 4;
      component.currentPage = 1;
      component.updatePaginatedHeroes();

      expect(component.paginatedHeroes).toEqual([
        { id: 5, name: 'Hero 5' , description: 'Description for Hero 5' },
        { id: 6, name: 'Hero 6' , description: 'Description for Hero 6' },
        { id: 7, name: 'Hero 7' , description: 'Description for Hero 7' },
        { id: 8, name: 'Hero 8' , description: 'Description for Hero 8' },
      ]);
    });

 
});
