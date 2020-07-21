import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MultipleCharacterView } from 'src/app/views/character/multipleCharacterView';
import { SingleCharacterView } from 'src/app/views/character/singleCharacterView';
import { HelperService } from '../helper.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private helperService: HelperService, private http: HttpClient) {}
  private urlBranch = 'characters';

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
}
