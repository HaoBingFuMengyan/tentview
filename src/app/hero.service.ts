import { Injectable } from '@angular/core';
import { Hero } from './hero/hero';
import { HEROES } from './hero/mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHeroes(): Hero[]{
  	return HEROES;
  }
  constructor() { }
}
