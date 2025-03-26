import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '../../services/hero.service';
import { LoadingService } from '../../services/loading.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  imports: [RouterModule, CommonModule, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  standalone: true,
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  searchQuery = '';
  isLoading$ = this.loadingService.isLoading$;
  noHeroesMessage = '';
  noSearchResultsMessage = '';
  paginatedHeroes: Hero[] = [];
  pageSize = 4;
  currentPage = 0;

  constructor(
    private heroService: HeroService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      this.filteredHeroes = heroes;
      this.noHeroesMessage = heroes.length === 0 ? 'No heroes available.' : '';
      this.updatePaginatedHeroes();
    });
  }

  filterHeroes(): void {
    this.filteredHeroes = this.heroService.searchHeroes(this.searchQuery);
    this.noSearchResultsMessage =
      this.filteredHeroes.length === 0 && this.searchQuery
        ? 'No heroes match your search.'
        : '';
    this.updatePaginatedHeroes();
  }

  deleteHero(id: number): void {
    if (confirm('Are you sure you want to delete this hero?')) {
      this.loadingService.show();
      setTimeout(() => {
        this.heroService.deleteHero(id);
        this.loadingService.hide();
      }, 200); // Simulate delay for demonstration
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedHeroes();
  }

   updatePaginatedHeroes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHeroes = this.filteredHeroes.slice(startIndex, endIndex);
  }
}
