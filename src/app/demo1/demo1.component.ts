import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
  }

  btnClick(): void {
    this.dataService.getHeroes()
      .subscribe(x => console.log(JSON.stringify(x)));
  }
}
