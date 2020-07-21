import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { HelperService } from '../helper.service';
import { MainParamsService } from './main-params.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterParamsService {
  constructor(
    private helperService: HelperService,
    private mainParamsService: MainParamsService
  ) {}
  private nameStartsWith$ = new BehaviorSubject<any>({});

  allCharacterParams$ = combineLatest([
    this.mainParamsService.mainParams$,
    this.nameStartsWith$.asObservable(),
  ]).pipe(
    debounceTime(500),
    map(([mainParams, nameStartsWith]) =>
      Object.assign({}, mainParams, nameStartsWith)
    )
  );

  initializeCharacterParams(initialData: any) {
    const field = initialData.nameStartsWith;
    if (field) {
      this.nameStartsWith$.next({ nameStartsWith: field });
    }
  }

  get nameStartsWith() {
    return this.nameStartsWith$.getValue().nameStartsWith;
  }

  set nameStartsWith(input: string) {
    this.helperService.setBehaviorSubject(
      this.nameStartsWith$,
      input,
      'nameStartsWith'
    );
  }

  resetCharacterParams() {
    this.nameStartsWith$.next({});
    this.mainParamsService.resetAll();
  }
}
