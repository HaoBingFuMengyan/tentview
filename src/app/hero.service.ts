import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero/hero';
import { HEROES } from './hero/mock-heroes';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  //得到一组英雄
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
      );
  }

  getHeroe(id: number): Observable<Hero>{
  	this.messageService.add(`HeroService: fetched heroes id=${id}`);
  	return of(HEROES.find(hero => hero.id === id));
  }

  //获取一个英雄
  getHero(id: number): Observable<Hero>{
     const uri = `${this.heroesUrl}/${id}`;
     console.log(uri);
     return this.http.get<Hero>(uri).pipe(
       tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<Hero>(`getHero id=${id}`))
       );
  }

  //更新一个英雄
  updateHero(hero: Hero): Observable<any>{
    console.log('update'+this.heroesUrl);
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
      );
  }

  //添加一个英雄
  addHero(hero: Hero): Observable<Hero>{
   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
     tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
     catchError(this.handleError<Hero>('addHero'))
     );
  }

  //删除一个英雄
  deleteHero(hero: Hero | number ): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const uri = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(uri,httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
      );
  }
  //根据名称搜索英雄
  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()) {
      return of([]);
    }
    
    const uri = `${this.heroesUrl}/?name=${term}`;
    
    return this.http.get<Hero[]>(uri).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>("searchHero",[]))
      );
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  
}
