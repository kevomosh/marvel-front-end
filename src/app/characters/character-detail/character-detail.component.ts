import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CharacterService } from 'src/app/services/api/character.service';
import { CharacterParamsService } from 'src/app/services/params/character-params.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private characterParamsService: CharacterParamsService
  ) {}

  relevantId: string;

  comicsTable$ = this.activatedRoute.paramMap.pipe(
    switchMap((routeParam: ParamMap) => {
      const characterId = routeParam.get('id');
      this.relevantId = characterId;

      const comics$ = this.characterService.getComicCollectionWithParams(
        characterId
      );
      return combineLatest([
        comics$,
        this.characterParamsService.comicTableInfo$,
      ]).pipe(
        map(([comics, tableInfo]) => ({
          comics,
          tableInfo,
        }))
      );
    })
  );

  setPage(pageInfo: any) {
    const totalOffset = pageInfo.pageSize * pageInfo.offset;
    this.characterParamsService.setComicsCollectionOffset(totalOffset);
    this.characterParamsService.setPageNumber(pageInfo.offset);
  }

  openComic(comicId: string) {
    this.router.navigate(['/comics', comicId]);
  }

  ngOnInit(): void {}
}
