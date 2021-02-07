import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { combineAll, concatMap, map } from 'rxjs/operators';
import { IFieldOffice, ISource } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.scss']
})
export class Demo2Component implements OnInit, OnDestroy {

  //#region Solution 1
  sources1: any;
  subscription1: Subscription | undefined;
  //#endregion

  //#region Solution 2
  sources2: any = [];
  subscription2: Subscription | undefined;
  //#endregion

  //#region Solution 3
  sources3$: Observable<ISource[]> = EMPTY;
  //#endregion

  constructor(private readonly dataService: DataService) {
    this.sources1 = [];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  //#region Solution 1
  onBtnClick1(): void {
    this.subscription1 = of(1, 2, 3)
      .pipe(
        map(fieldOfficeId => {
          this.dataService.getFieldOffice(fieldOfficeId)
            .subscribe((fieldOffice: IFieldOffice) => {
              this.dataService.getSourcesByFieldOffice(fieldOffice.id)
                .subscribe(sources => {
                  this.sources1 = this.sources1.concat(sources);
                });
            });
        })
      )
      .subscribe(s => s);
  }
  //#endregion

  //#region Solution 2
  onBtnClick2(): void {
    this.subscription2 = of(1, 2, 3)
      .pipe(
        concatMap(fieldOfficeId =>
          this.dataService.getFieldOffice(fieldOfficeId)
            .pipe(
              concatMap(x => this.dataService.getSourcesByFieldOffice(x.id))
            )
        )
      )
      .subscribe(sources => {
        this.sources2 = this.sources2.concat(sources);
      });
  }
  //#endregion

  //#region Solution 3
  onBtnClick3(): void {
    this.sources3$ = of(1, 2, 3)
      .pipe(
        concatMap(fieldOfficeId =>
          this.dataService.getFieldOffice(fieldOfficeId)
            .pipe(
              concatMap(fieldOffice => this.dataService.getSourcesByFieldOffice(fieldOffice.id)),
              combineAll()
            )
        ),
        combineAll()
      );
  }
  //#endregion
}
