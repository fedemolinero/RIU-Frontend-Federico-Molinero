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
    const hero: Hero = {
      id: 0,
      name: 'Test Hero',
      description: 'Test Description',
    };
    service.addHero(hero);
    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(1);
      expect(heroes[0].name).toBe('Test Hero');
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

  it('should return all heroes', () => {
    const hero1: Hero = {
      id: 6,
      name: 'Hero Six',
      description: 'Description Six',
    };
    const hero2: Hero = {
      id: 7,
      name: 'Hero Seven',
      description: 'Description Seven',
    };
    service.addHero(hero1);
    service.addHero(hero2);
    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(2);
      expect(heroes[0].name).toBe('Hero Six');
      expect(heroes[1].name).toBe('Hero Seven');
    });
  });

  it('should add a hero and update the observable', (done) => {
    const newHero: Hero = {
      id: 0,
      name: 'New Hero',
      description: 'New Hero Description',
    };

    service.getHeroes().subscribe((heroes) => {
      if (heroes.some((hero) => hero.name === 'New Hero')) {
        expect(heroes.length).toBe(1);
        expect(heroes[0].name).toBe('New Hero');
        done();
      }
    });

    service.addHero(newHero);
  });

  it('should update a hero', () => {
    const hero: Hero = { id: 1, name: 'Updated Hero', description: 'Updated Description' };
    service.addHero(hero);
    const updatedHero: Hero = { id: hero.id, name: 'Updated Hero', description: 'Updated Description' };
    service.updateHero(updatedHero);
    service.getHeroes().subscribe((heroes) => {
      expect(heroes[0].name).toBe('Updated Hero');
      expect(heroes[0].description).toBe('Updated Description');
    });
  });

  it('should delete a hero', () => {
    const hero: Hero = { id: Date.now(), name: 'Hero Two', description: 'Description Two' };
    service.addHero(hero);
    service.deleteHero(hero.id);
    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(0);
    });
  });

  it('should get a hero by ID', () => {
    const hero: Hero = { id: Date.now(), name: 'Hero Five', description: 'Description Five' };
    service.addHero(hero);
    
    const foundHero = service.getHeroById(hero.id);
    expect(foundHero).toBeTruthy();
  });



});
