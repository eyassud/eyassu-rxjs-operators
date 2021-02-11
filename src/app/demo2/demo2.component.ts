import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
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

    for (let fieldOfficeId = 1; fieldOfficeId <= 3; fieldOfficeId++) {
      console.log(`Getting field office ${fieldOfficeId}`);

      this.dataService.getFieldOffice(fieldOfficeId)
        .subscribe((fieldOffice: IFieldOffice) => {
          console.log(`Getting sources for ${fieldOffice.name}`);

          this.dataService.getSourcesByFieldOffice(fieldOffice.id)
            .subscribe(sources => {
              this.sources1 = sources;
            });
        });
    }
  }
  //#endregion

  //#region Solution 2
  onBtnClick2(): void {
    this.subscription2 = of(1, 2, 3)
      .pipe(
        tap(fieldOfficeId => console.log(`Getting field office ${fieldOfficeId}`)),
        concatMap(fieldOfficeId =>
          this.dataService.getFieldOffice(fieldOfficeId)
            .pipe(
              tap(fieldOffice => console.log(`Getting sources for ${fieldOffice.name}`)),
              concatMap(x => this.dataService.getSourcesByFieldOffice(x.id))
            )
        )
      )
      .subscribe(sources => {
        this.sources2 = sources;
      });
  }
  //#endregion

  //#region Solution 3
  onBtnClick3(): void {
    this.sources3$ = of(1, 2, 3)
      .pipe(
        tap(fieldOfficeId => console.log(`Getting field office ${fieldOfficeId}`)),
        concatMap(fieldOfficeId =>
          this.dataService.getFieldOffice(fieldOfficeId)
            .pipe(
              tap(fieldOffice => console.log(`Getting sources for ${fieldOffice.name}`)),
              concatMap(fieldOffice => this.dataService.getSourcesByFieldOffice(fieldOffice.id))
            )
        )
      );
  }
  //#endregion
}
