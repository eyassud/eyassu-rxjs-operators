import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IFieldOffice } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {
  fieldOffices = [];

  //#region Solution 1
  fieldOffice1: IFieldOffice | null = null;
  //#endregion

  //#region Solution 3
  fieldOffice3: IFieldOffice | null = null;
  private fieldOfficeIdSubject3 = new Subject<number>();
  fieldOfficeIdAction3$ = this.fieldOfficeIdSubject3.asObservable()
    .pipe(
      switchMap(fieldOfficeId => this.dataService.getFieldOffice(fieldOfficeId)));
  //#endregion

  //#region Solution 4
  fieldOffice4: IFieldOffice | null = null;
  fieldOffices$ = this.dataService.getAllFieldOffices();
  private fieldOfficeIdSubject4 = new Subject<number>();
  fieldOfficeIdAction4$ = this.fieldOfficeIdSubject4.asObservable()
    .pipe(
      switchMap(fieldOfficeId => {
        return this.dataService.getFieldOffice(fieldOfficeId);
      }));
  //#endregion

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllFieldOffices()
      .subscribe(offices => this.fieldOffices = offices);
  }

  //#region Solution 1
  onOfficeSelected1(event: any): void {
    this.dataService.getFieldOffice(+event.value)
      .subscribe(
        o => {
          this.fieldOffice1 = o;
        });
  }
  //#endregion

  //#region Solution 3
  onOfficeSelected3(event: any): void {
    this.fieldOfficeIdSubject3.next(+event.value);
    this.fieldOfficeIdAction3$
      .subscribe(
        o => {
          console.log(JSON.stringify(o));
          this.fieldOffice3 = o;
        });
  }
  //#endregion

  //#region Solution 4
  onOfficeSelected4(event: any): void {
    this.fieldOfficeIdSubject4.next(+event.value);
  }
  //#endregion
}
