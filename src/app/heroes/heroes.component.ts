import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /**
   * 往构造函数添加一个私有的heroService属性，
   * 这个参数做了两件事情：1.声明一个私有的heroService属性，2.把它标记为一个HeroService的注入点
   * @param {HeroService} private heroService [description]
   */
  constructor(private heroService: HeroService) { }
  ngOnInit() {
    this.getHeroes();
  }
  heroes: Hero[];
  selectedHero: Hero;
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  
  getHeroes(): void{
    //this.heroes = this.heroService.getHeroes();这种赋值是同步，只能模拟本地数据或者数据量小的情况中，实际应用中推荐使用异步
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  
}

