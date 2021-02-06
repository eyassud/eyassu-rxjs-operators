import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFieldOffice } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'api/fieldOffices';

  constructor(private readonly http: HttpClient) { }

  getHeroes(): Observable<Array<IFieldOffice>> {
    return this.http.get<Array<IFieldOffice>>(this.dataUrl);
  }
}
