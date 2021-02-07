import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
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
  subscription1: Subscription | undefined;
  //#endregion

  //#region Solution 2
  fieldOffice2: IFieldOffice | null = null;
  subscription2: Subscription | undefined;
  private solution2Subject = new Subject<number>();
  solution2Action$ = this.solution2Subject.asObservable()
    .pipe(
      switchMap(fieldOfficeId => this.dataService.getFieldOffice(fieldOfficeId)));
  //#endregion

  //#region Solution 3
  fieldOffice3: IFieldOffice | null = null;
  private solution3Subject = new Subject<number>();
  solution3Action$ = this.solution3Subject.asObservable()
    .pipe(
      switchMap(fieldOfficeId => this.dataService.getFieldOffice(fieldOfficeId)));
  //#endregion

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllFieldOffices()
      .subscribe(offices => this.fieldOffices = offices);
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.solution2Subject?.unsubscribe();
    // ...
  }

  //#region Solution 1
  onOfficeSelected1(event: any): void {
    this.log(event);
    this.subscription1 = this.dataService.getFieldOffice(+event.value)
      .subscribe(
        o => this.fieldOffice1 = o);
  }
  //#endregion

  //#region Solution 2
  onOfficeSelected2(event: any): void {
    this.log(event);
    this.solution2Subject.next(+event.value);
    this.subscription2 = this.solution2Action$
      .subscribe(
        fieldOffice => this.fieldOffice2 = fieldOffice);
  }
  //#endregion

  //#region Solution 3
  onOfficeSelected3(event: any): void {
    this.log(event);
    this.solution3Subject.next(+event.value);
  }
  //#endregion

  //#region Private methods
  private log(event: any): void {
    console.log(`Getting ${this.fieldOffices.find(fieldOffice => fieldOffice.id === +event.value)?.name} ` +
      `(delay: ${(this.dataService.delay / +event.value).toFixed(0)} ms)`);
  }
  //#endregion
}
