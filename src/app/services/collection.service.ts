import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MultipleCharacterView } from '../views/character/multipleCharacterView';
import { SingleCharacterView } from '../views/character/singleCharacterView';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private showCharacterCollection$ = new BehaviorSubject<boolean>(false);
  private characterList$ = new BehaviorSubject<SingleCharacterView[]>([]);

  constructor() {}

  characterCollectionInfo$ = combineLatest([
    this.showCharacterCollection$.asObservable(),
    this.characterList$.asObservable(),
  ]).pipe(
    map(([showCharacter, characterList]) => ({
      showCharacter,
      characterList,
    }))
  );

  setCollection(input: MultipleCharacterView) {
    this.showCharacterCollection$.next(true);
    this.characterList$.next(input.listOfCharacters);
  }

  resetCharacterCollection() {
    this.showCharacterCollection$.next(false);
    this.characterList$.next([]);
  }
}
