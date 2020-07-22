import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MultipleCharacterView } from 'src/app/views/character/multipleCharacterView';
import { SingleCharacterView } from 'src/app/views/character/singleCharacterView';
import { MultipleComicView } from 'src/app/views/comic/multipleComicView';
import { MultipleSeriesView } from 'src/app/views/series/multipleSeriesView';
import { HelperService } from '../helper.service';
import { CharacterParamsService } from '../params/character-params.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(
    private helperService: HelperService,
    private http: HttpClient,
    private characterParamsService: CharacterParamsService
  ) {}
  private urlBranch = 'characters';

  getComicCollectionWithParams(
    characterId: any
  ): Observable<MultipleComicView> {
    return this.characterParamsService.combinedComicsCollectionParams$.pipe(
      switchMap((characterParams) =>
        this.http.get<MultipleComicView>(
          this.helperService.getCollectionUrl(this.urlBranch),
          {
            params: this.createPaginationParams(
              'comics',
              characterId,
              characterParams
            ),
          }
        )
      )
    );
  }

  getSeriesCollection(characterId: any): Observable<MultipleSeriesView> {
    return this.http.get<MultipleSeriesView>(
      this.helperService.getCollectionUrl(this.urlBranch),
      {
        params: {
          relevantId: characterId,
          fieldName: 'series',
        },
      }
    );
  }

  getSeriesCollectionWithParams(characterId: string, characterParams: any) {
    return this.http.get<MultipleSeriesView>(
      this.helperService.getCollectionUrl(this.urlBranch),
      {
        params: this.createPaginationParams(
          'series',
          characterId,
          characterParams
        ),
      }
    );
  }

  getCharacters(characterParams: any): Observable<MultipleCharacterView> {
    return this.http.get<MultipleCharacterView>(
      this.helperService.getFilteredUrl(this.urlBranch),
      {
        params: characterParams,
      }
    );
  }

  getCharacterById(characterId: any): Observable<SingleCharacterView> {
    return this.http.get<SingleCharacterView>(
      this.helperService.getById(this.urlBranch, characterId)
    );
  }

  private createPaginationParams(
    collectionName: string,
    characterId: string,
    characterParams: any
  ) {
    const requiredFields = {
      fieldName: collectionName,
      relevantId: characterId,
    };
    return Object.assign({}, requiredFields, characterParams);
  }
}
