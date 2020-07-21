import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainParamsService {
  private limit$ = new BehaviorSubject<any>({ limit: 20 });
  private offset$ = new BehaviorSubject<any>({ offset: 0 });

  initialize(x: any) {
    this.limit$.next(x);
    this.offset$.next({});
  }

  resetAll() {
    this.limit$.next({ limit: 20 });
    this.offset$.next({ offset: 0 });
  }

  get limit() {
    return this.limit$.getValue().limit;
  }

  set limit(i: number) {
    this.limit$.next({ limit: i });
  }

  get offset() {
    return this.offset$.getValue().offset;
  }

  set offset(i: number) {
    this.offset$.next({ offset: i });
  }

  settingOffset(i: number) {
    this.offset$.next({ offset: i });
  }

  mainParams$ = combineLatest([
    this.limit$.asObservable(),
    this.offset$.asObservable(),
  ]).pipe(map(([limit, offset]) => Object.assign({}, limit, offset)));

  // mainParams$ = combineLatest([
  //   this.limit$.asObservable(),
  //   this.offset$.asObservable(),
  // ]).pipe(
  //   map(([limit, offset]) => ({
  //     limit,
  //     offset,
  //   }))
  // );
}
