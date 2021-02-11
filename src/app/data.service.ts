import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFieldOffice, ISource } from './data.model';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public delay = 1000;
  private dataUrl = 'api';

  constructor(private readonly http: HttpClient) { }

  getFieldOffice(officeId: number): Observable<IFieldOffice> {
    const url = `${this.dataUrl}/fieldOffices/${officeId}`;

    return this.http.get<IFieldOffice>(url)
      .pipe(
        delay(this.delay / officeId)
      );
  }

  getAllFieldOffices(): Observable<Array<IFieldOffice>> {
    const url = `${this.dataUrl}/fieldOffices`;

    return this.http.get<Array<IFieldOffice>>(url);
  }

  getSourcesByFieldOffice(fieldOfficeId: number): Observable<Array<ISource>> {
    const url = `${this.dataUrl}/sources/?fieldOfficeId=${fieldOfficeId}`;

    return this.http.get<Array<ISource>>(url);
  }

  getAllSources(): Observable<Array<ISource>> {
    const url = `${this.dataUrl}/sources`;

    return this.http.get<Array<ISource>>(url);
  }
}
