import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Hero {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly initialHeroes: ReadonlyArray<Hero> = [
    // Example heroes can be uncommented for testing
    // { id: 1, name: 'Test Hero', description: 'Test Description' },
    // { id: 2, name: 'Test Hero 1', description: 'Test Description 1' },
    // { id: 3, name: 'Test Hero 2', description: 'Test Description 2' },
  ];
  private heroes: Hero[] = [...this.initialHeroes];
  private heroesSubject = new BehaviorSubject<Hero[]>(this.heroes);

  // Returns an observable of the heroes list
  getHeroes(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  // Finds a hero by ID or throws an error if not found
  getHeroById(id: number): Hero | undefined{
    const hero = this.heroes.find((hero) => hero.id === id);
    return hero;
  }

  // Adds a new hero to the list
  addHero(hero: Hero): void {
    this.heroes.push({ ...hero, id: Date.now() });
    this.heroesSubject.next(this.heroes);
  }

  // Updates an existing hero by ID
  updateHero(updatedHero: Hero): void {
    const index = this.heroes.findIndex((h) => h.id === updatedHero.id);
    this.heroes[index] = updatedHero;
    this.heroesSubject.next(this.heroes); // Emit updated list
  }

  // Deletes a hero by ID
  deleteHero(id: number): void {
    this.heroes = this.heroes.filter((hero) => hero.id !== id);
    this.heroesSubject.next(this.heroes);
  }

  // Searches heroes by name
  searchHeroes(query: string): Hero[] {
    const lowerCaseQuery = query.toLowerCase();
    return this.heroes.filter((hero) =>
      hero.name.toLowerCase().includes(lowerCaseQuery)
    );
  }
}
