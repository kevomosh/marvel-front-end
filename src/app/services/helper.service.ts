import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}
  private BASE_URL = 'http://localhost:3000';

  setBehaviorSubject(
    behaviorSubject: BehaviorSubject<any>,
    input: any,
    field: string
  ) {
    if (input) {
      behaviorSubject.next({ [field]: input });
    } else {
      behaviorSubject.next({});
    }
  }

  getCollectionUrl(urlBranch: string) {
    return `${this.BASE_URL}/${urlBranch}/collection`;
  }

  getFilteredUrl(urlBranch: string) {
    return `${this.BASE_URL}/${urlBranch}/filtered`;
  }

  getById(urlBranch: string, relevantId: any) {
    return `${this.BASE_URL}/${urlBranch}/byId/${relevantId}`;
  }
}
