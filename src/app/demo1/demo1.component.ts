import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, of, Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IFieldOffice } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit, OnDestroy {
  fieldOffices: IFieldOffice[] = [];

  //#region Solution 1
  fieldOffice1: IFieldOffice | null = null;
  //#endregion

  //#region Solution 2
  fieldOffice2: IFieldOffice | null = null;
  subscription2: Subscription | undefined;
  //#endregion

  //#region Solution 3
  fieldOffice3: IFieldOffice | null = null;
  fieldOfficeSelected$: Observable<IFieldOffice>;
  //#endregion

  constructor(private readonly dataService: DataService) { this.fieldOfficeSelected$ = EMPTY; }

  ngOnInit(): void {
    this.dataService.getAllFieldOffices()
      .subscribe(offices => this.fieldOffices = offices);
  }

  //#region Solution 1 (Avoid)
  onOfficeSelected1(event: any): void {
    this.dataService.getFieldOffice(+event.value)
      .subscribe(
        fieldOffice => this.fieldOffice1 = fieldOffice);
  }
  //#endregion

  //#region Solution 2 (Better)
  onOfficeSelected2(event: any): void {
    this.subscription2 = of(+event.value)
      .pipe(
        switchMap(fieldOfficeId => this.dataService.getFieldOffice(fieldOfficeId)))
      .subscribe(
        fieldOffice => this.fieldOffice2 = fieldOffice);
  }
  //#endregion

  //#region Solution 3 (Best)
  onOfficeSelected3(event: any): void {
    this.fieldOfficeSelected$ = of(+event.value)
      .pipe(
        switchMap(fieldOfficeId => this.dataService.getFieldOffice(fieldOfficeId)));
  }
  //#endregion

  ngOnDestroy(): void {
    this.subscription2?.unsubscribe();
  }

  //#region Private methods
  private log(event: any): void {
    console.log(`Getting ${this.fieldOffices.find(fieldOffice => fieldOffice.id === +event.value)?.name} ` +
      `(delay: ${(this.dataService.delay / +event.value).toFixed(0)} ms)`);
  }
  //#endregion
}
