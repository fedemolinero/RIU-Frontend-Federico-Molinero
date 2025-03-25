import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    // { id: 0, name: 'Test Hero', description: 'Test Description' },
    // { id: 1, name: 'Test Hero 1', description: 'Test Description 1' },
    // { id: 2, name: 'Test Hero 2', description: 'Test Description 2' },
  ];
  private heroes: Hero[] = [...this.initialHeroes];
  private heroesSubject = new BehaviorSubject<Hero[]>(this.heroes);

  // Returns an observable of the heroes list
  getHeroes(): Observable<Hero[]> {
    return this.heroesSubject.asObservable().pipe(
      map((heroes) => [...heroes]) // Ensure immutability
    );
  }

  // Finds a hero by ID or throws an error if not found
  getHeroById(id: number): Hero {
    const hero = this.heroes.find((hero) => hero.id === id);
    if (!hero) {
      throw new Error(`Hero with ID ${id} not found`);
    }
    return hero;
  }

  // Adds a new hero to the list
  addHero(hero: Hero): void {
    const newHero = { ...hero, id: Date.now() };
    this.heroesSubject.next([...this.heroesSubject.value, newHero]);
  }

  // Updates an existing hero by ID
  updateHero(updatedHero: Hero): void {
    const updatedHeroes = this.heroesSubject.value.map((hero) =>
      hero.id === updatedHero.id ? updatedHero : hero
    );
    this.heroesSubject.next(updatedHeroes);
  }

  // Deletes a hero by ID
  deleteHero(id: number): void {
    const updatedHeroes = this.heroesSubject.value.filter(
      (hero) => hero.id !== id
    );
    this.heroesSubject.next(updatedHeroes);
  }

  // Searches heroes by name
  searchHeroes(query: string): Hero[] {
    const lowerCaseQuery = query.toLowerCase();
    return this.heroes.filter((hero) =>
      hero.name.toLowerCase().includes(lowerCaseQuery)
    );
  }
}
