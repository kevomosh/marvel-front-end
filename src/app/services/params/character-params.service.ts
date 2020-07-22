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
  private collectionLimit$ = new BehaviorSubject<{ limit: number }>({
    limit: 10,
  });
  private pageNumber$ = new BehaviorSubject<number>(0);
  private seriesCollectionOffset$ = new BehaviorSubject<any>({ offset: 0 });
  private comicsCollectionOffset$ = new BehaviorSubject<any>({ offset: 0 });

  comicTableInfo$ = combineLatest([
    this.pageNumber$.asObservable(),
    this.collectionLimit$.asObservable(),
  ]).pipe(
    map(([pageNumber, limitObj]) => ({
      pageNumber,
      limitObj,
    }))
  );

  setPageNumber(input: number) {
    this.pageNumber$.next(input);
  }

  setSeriesCollectionOffset(input: any) {
    this.helperService.setBehaviorSubject(
      this.seriesCollectionOffset$,
      input,
      'offset'
    );
  }

  setComicsCollectionOffset(input: any) {
    this.helperService.setBehaviorSubject(
      this.comicsCollectionOffset$,
      input,
      'offset'
    );
  }

  combinedComicsCollectionParams$ = combineLatest([
    this.collectionLimit$.asObservable(),
    this.comicsCollectionOffset$.asObservable(),
  ]).pipe(map(([limit, offset]) => Object.assign({}, limit, offset)));

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
