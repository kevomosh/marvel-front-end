import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { HelperService } from '../helper.service';
import { MainParamsService } from './main-params.service';

@Injectable({
  providedIn: 'root',
})
export class ComicParamsService {
  constructor(
    private mainParamsService: MainParamsService,
    private helperService: HelperService
  ) {}

  private startYear$ = new BehaviorSubject<any>({});
  private titleStartsWith$ = new BehaviorSubject<any>({});
  private formatType$ = new BehaviorSubject<any>({});
  private format$ = new BehaviorSubject<any>({});

  allComicParams$ = combineLatest([
    this.mainParamsService.mainParams$,
    this.startYear$.asObservable(),
    this.titleStartsWith$.asObservable(),
    this.formatType$.asObservable(),
    this.format$.asObservable(),
  ]).pipe(
    debounceTime(1000),
    map(([mainParams, startYear, titleStartsWith, formatType, format]) =>
      Object.assign(
        {},
        mainParams,
        startYear,
        titleStartsWith,
        formatType,
        format
      )
    )
  );

  // delayedTitleStartsWith() {
  //   return this.titleStartsWith$.asObservable().pipe(debounceTime(1000));
  // }

  resetAll() {
    this.startYear$.next({});
    this.titleStartsWith$.next({});
    this.formatType$.next({});
    this.format$.next({});
  }

  get format() {
    return this.format$.getValue().format;
  }

  set format(input: any) {
    this.helperService.setBehaviorSubject(this.format$, input, 'format');
  }

  get formatType() {
    return this.formatType$.getValue().formatType;
  }

  set formatType(input: any) {
    this.helperService.setBehaviorSubject(
      this.formatType$,
      input,
      'formatType'
    );
  }

  initializeComicParams(initial: any) {
    const field = initial.titleStartsWith;

    if (field) this.titleStartsWith$.next({ titleStartsWith: field });
  }

  private initializeSingleParam(
    initial: any,
    behaviorSubject: BehaviorSubject<any>,
    relevantField: any
  ) {
    const field = initial.relevantField;
    if (field) {
      behaviorSubject.next({ [relevantField]: field });
    }
  }

  get startYear() {
    return this.startYear$.getValue().startYear;
  }

  set startYear(input: number) {
    this.helperService.setBehaviorSubject(this.startYear$, input, 'startYear');
  }

  get titleStartsWith() {
    return this.titleStartsWith$.getValue().titleStartsWith;
  }

  set titleStartsWith(input: string) {
    //this.mainParamsService.resetAll();

    this.helperService.setBehaviorSubject(
      this.titleStartsWith$,
      input,
      'titleStartsWith'
    );
  }
}
