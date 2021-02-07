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
  private fieldOfficeIdSubject2 = new Subject<number>();
  fieldOfficeIdAction2$ = this.fieldOfficeIdSubject2.asObservable()
    .pipe(
      switchMap(fieldOfficeId => this.dataService.getFieldOffice(fieldOfficeId)));
  //#endregion

  //#region Solution 3
  fieldOffice3: IFieldOffice | null = null;
  private fieldOfficeIdSubject3 = new Subject<number>();
  fieldOfficeIdAction3$ = this.fieldOfficeIdSubject3.asObservable()
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
    this.fieldOfficeIdSubject2?.unsubscribe();
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
    this.fieldOfficeIdSubject2.next(+event.value);
    this.subscription2 = this.fieldOfficeIdAction2$
      .subscribe(
        fieldOffice => this.fieldOffice2 = fieldOffice);
  }
  //#endregion

  //#region Solution 3
  onOfficeSelected3(event: any): void {
    this.log(event);
    this.fieldOfficeIdSubject3.next(+event.value);
  }
  //#endregion

  //#region Private methods
  private log(event: any): void {
    console.log(`Getting ${this.fieldOffices.find(fieldOffice => fieldOffice.id === +event.value)?.name} ` +
      `(delay: ${(this.dataService.delay / +event.value).toFixed(0)} ms)`);
  }
  //#endregion
}
