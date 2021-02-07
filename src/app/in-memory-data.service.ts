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
      { id: 3, name: 'St Louis' },
      { id: 4, name: 'Washington D.C.' }
    ];

    const sources = [
      { id: 's1', name: 'Man1', fieldOfficeId: 1 },
      { id: 's2', name: 'Woman1', fieldOfficeId: 2 },
      { id: 's3', name: 'Woman2', fieldOfficeId: 3 },
      { id: 's4', name: 'Woman3', fieldOfficeId: 1 },
      { id: 's5', name: 'Man2', fieldOfficeId: 2 },
      { id: 's6', name: 'Woman4', fieldOfficeId: 3 },
      { id: 's7', name: 'Man3', fieldOfficeId: 3 }
    ];

    return { fieldOffices, sources };
  }
}
