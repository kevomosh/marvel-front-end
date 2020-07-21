import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ComicService } from 'src/app/services/api/comic.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss'],
})
export class ComicDetailComponent implements OnInit {
  constructor(
    private comicService: ComicService,
    private activatedRoute: ActivatedRoute,
    public collectionService: CollectionService
  ) {}

  ngOnInit(): void {}

  comic$ = this.activatedRoute.paramMap.pipe(
    switchMap((routeParam: ParamMap) => {
      const comicId = routeParam.get('id');
      return this.comicService.getComicById(comicId);
    })
  );

  combined$ = this.activatedRoute.paramMap.pipe(
    switchMap((routeParam: ParamMap) => {
      const comicId = routeParam.get('id');
      const comicDetail$ = this.comicService.getComicById(comicId);
      const collection$ = this.comicService.getCharacterCollection(comicId);

      return combineLatest([
        comicDetail$,
        this.collectionService.characterCollectionInfo$,
        collection$,
      ]).pipe(
        map(([comic, characterCollectionInfo]) => ({
          comic,
          characterCollectionInfo,
        }))
      );
    })
  );
}
