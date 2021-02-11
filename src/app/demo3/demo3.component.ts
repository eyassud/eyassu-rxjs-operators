import { Component, OnInit } from '@angular/core';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFieldOffice } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
  styleUrls: ['./demo3.component.scss']
})
export class Demo3Component implements OnInit {

  // Observables
  fieldOffices$: Observable<IFieldOffice[]>;

  constructor(private readonly dataService: DataService) {
    this.fieldOffices$ = EMPTY;
  }

  ngOnInit(): void {
  }

  onBtnClick(): void {
    const baltimore$ = this.dataService.getFieldOffice(1);
    const stLouis$ = this.dataService.getFieldOffice(3);

    this.fieldOffices$ = combineLatest([baltimore$, stLouis$])
      .pipe(
        map(([baltimore, stLouis]) => ( [baltimore, stLouis])
        ));
  }
}
