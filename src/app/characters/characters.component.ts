import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { CharacterService } from '../services/api/character.service';
import { CharacterParamsService } from '../services/params/character-params.service';
import { MainParamsService } from '../services/params/main-params.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
  constructor(
    private characterService: CharacterService,
    public characterParamsService: CharacterParamsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mainParamsService: MainParamsService
  ) {}
  private destroyInitialize = new Subject<void>();

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroyInitialize))
      .subscribe((x) => {
        this.mainParamsService.initialize(x);
        this.characterParamsService.initializeCharacterParams(x);
      });
    this.unsubscribe();
  }

  result$ = combineLatest([
    this.activatedRoute.queryParams,
    this.characterParamsService.allCharacterParams$,
  ]).pipe(
    map(([queryParams, allParams]) => ({ queryParams, allParams })),
    switchMap((x) => {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: x.allParams,
      });
      return this.characterService.getCharacters(x.queryParams);
    })
  );

  ngOnDestroy() {
    this.characterParamsService.resetCharacterParams();
  }

  unsubscribe() {
    this.destroyInitialize.next();
    this.destroyInitialize.complete();
  }
}
