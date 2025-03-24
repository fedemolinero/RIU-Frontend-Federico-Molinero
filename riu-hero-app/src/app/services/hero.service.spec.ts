import { TestBed } from '@angular/core/testing';
import { HeroService, Hero } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a hero', () => {
    const hero: Hero = { id: 0, name: 'Test Hero', description: 'Test Description' };
    service.addHero(hero);
    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(1);
      expect(heroes[0].name).toBe('Test Hero');
    });
  });

  it('should update a hero', () => {
    const hero: Hero = { id: 1, name: 'Hero One', description: 'Description One' };
    service.addHero(hero);
    const updatedHero: Hero = { id: hero.id, name: 'Updated Hero', description: 'Updated Description' };
    service.updateHero(updatedHero);
    service.getHeroes().subscribe((heroes) => {
      expect(heroes[0].name).toBe('Updated Hero');
      expect(heroes[0].description).toBe('Updated Description');
    });
  });

  it('should delete a hero', () => {
    const hero: Hero = { id: 2, name: 'Hero Two', description: 'Description Two' };
    service.addHero(hero);
    service.deleteHero(hero.id);
    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(0);
    });
  });

  it('should search heroes by name', () => {
    const hero1: Hero = { id: 3, name: 'Hero A', description: 'Description A' };
    const hero2: Hero = { id: 4, name: 'Hero B', description: 'Description B' };
    service.addHero(hero1);
    service.addHero(hero2);
    const results = service.searchHeroes('Hero A');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Hero A');
  });


  it('should get a hero by ID', () => {
    const hero: Hero = { id: 5, name: 'Hero Five', description: 'Description Five' };
    service.addHero(hero);
    const foundHero = service.getHeroById(hero.id);
    expect(foundHero).toBeTruthy();
    expect(foundHero?.name).toBe('Hero Five');
  });

  it('should return all heroes', () => {
    const hero1: Hero = { id: 6, name: 'Hero Six', description: 'Description Six' };
    const hero2: Hero = { id: 7, name: 'Hero Seven', description: 'Description Seven' };
    service.addHero(hero1);
    service.addHero(hero2);
    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(2);
      expect(heroes[0].name).toBe('Hero Six');
      expect(heroes[1].name).toBe('Hero Seven');
    });
  });

  it('should throw an error when getting a hero by ID that does not exist', () => {
    expect(() => service.getHeroById(999)).toThrowError('Hero with ID 999 not found');
  });

  it('should throw an error when updating a hero by ID that does not exist', () => {
    const updatedHero: Hero = { id: 999, name: 'Nonexistent Hero', description: 'Nonexistent Description' };
    expect(() => service.updateHero(updatedHero)).toThrowError('Hero with ID 999 not found');
  });

  it('should throw an error when deleting a hero by ID that does not exist', () => {
    expect(() => service.deleteHero(999)).toThrowError('Hero with ID 999 not found');
  });
});
