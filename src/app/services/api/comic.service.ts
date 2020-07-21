import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MultipleCharacterView } from 'src/app/views/character/multipleCharacterView';
import { MultipleComicView } from 'src/app/views/comic/multipleComicView';
import { SingleComicView } from 'src/app/views/comic/singleComicView';
import { CollectionService } from '../collection.service';
import { HelperService } from '../helper.service';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(
    private helperService: HelperService,
    private http: HttpClient,
    private collectionService: CollectionService
  ) {}

  private urlBranch = 'comic';

  getComics(comicsParams: any): Observable<MultipleComicView> {
    return this.http.get<MultipleComicView>(
      this.helperService.getFilteredUrl(this.urlBranch),
      {
        params: comicsParams,
      }
    );
  }

  getCharacterCollection(comicId: any): Observable<MultipleCharacterView> {
    return this.http
      .get<MultipleCharacterView>(
        this.helperService.getCollectionUrl(this.urlBranch),
        {
          params: {
            relevantId: comicId,
            fieldName: 'characters',
          },
        }
      )
      .pipe(tap((payload) => this.collectionService.setCollection(payload)));
  }

  getComicById(comicId: any): Observable<SingleComicView> {
    return this.http.get<SingleComicView>(
      this.helperService.getById(this.urlBranch, comicId)
    );
  }
}
