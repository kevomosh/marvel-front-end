import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ComicService } from '../services/api/comic.service';
import { ComicParamsService } from '../services/params/comic-params.service';
import { MainParamsService } from '../services/params/main-params.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {
  constructor(
    public comicsParamService: ComicParamsService,
    private comicService: ComicService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mainParamsService: MainParamsService
  ) {}

  private destroy = new Subject<void>();

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe((initial) => {
        this.mainParamsService.initialize(initial);
        this.comicsParamService.initializeComicParams(initial);
      });
    this.unsubscribe();
  }

  result$ = combineLatest([
    this.activatedRoute.queryParams,
    this.comicsParamService.allComicParams$,
  ]).pipe(
    map(([queryParams, allParams]) => ({ queryParams, allParams })),
    switchMap((x) => {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: x.allParams,
      });
      return this.comicService.getComics(x.queryParams);
    })
  );

  unsubscribe() {
    this.destroy.next();
    this.destroy.complete();
  }
}
