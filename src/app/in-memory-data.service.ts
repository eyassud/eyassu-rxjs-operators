import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const fieldOffices = [
      { id: 1, name: 'Baltimore' },
      { id: 2, name: 'Newyork' },
      { id: 4, name: 'St Louis' },
      { id: 5, name: 'Washington D.C.' }
    ];
    return {fieldOffices};
  }
}
