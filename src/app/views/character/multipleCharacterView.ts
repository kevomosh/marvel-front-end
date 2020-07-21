import { SingleCharacterView } from './singleCharacterView';

export interface MultipleCharacterView {
  offset: number;
  limit: number;
  total: number;
  count: number;
  listOfCharacters: SingleCharacterView[];
}
