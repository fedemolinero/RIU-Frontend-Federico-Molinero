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
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  imports: [RouterModule, CommonModule, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
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
  searchQuery$ = new BehaviorSubject<string>('');

  constructor(
    private heroService: HeroService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.heroService.getHeroes(),
      this.searchQuery$.pipe(startWith('')),
    ])
      .pipe(
        map(([heroes, query]) =>
          heroes.filter((hero) =>
            hero.name.toLowerCase().includes(query.toLowerCase())
          )
        )
      )
      .subscribe((filteredHeroes) => {
        this.filteredHeroes = filteredHeroes;
        this.noHeroesMessage = filteredHeroes.length === 0 ? 'No heroes available.' : '';
      });
  }

  filterHeroes(): void {
    this.searchQuery$.next(this.searchQuery);
  }

  deleteHero(id: number): void {
    if (confirm('Are you sure you want to delete this hero?')) {
      this.loadingService.show();
      setTimeout(() => {
        this.heroService.deleteHero(id);
        this.loadingService.hide();
      }, 2000); // Simulate delay for demonstration
    }
  }
}
