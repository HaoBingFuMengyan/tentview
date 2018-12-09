import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero/hero';
import { HEROES } from './hero/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  /**
   * of(HEROES)会返回一个Observable<Hero[]>，它会发出一个值，这个值就是这些英雄的数组。
   * @return {Observable<Hero[]>} [description]
   */
  // getHeroes(): Observable<Hero[]> {
  //   // TODO: send the message _after_ fetching the heroes
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHeroe(id: number): Observable<Hero>{
  	this.messageService.add(`HeroService: fetched heroes id=${id}`);
  	return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
  
}
