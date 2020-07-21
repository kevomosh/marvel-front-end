import { SingleComicView } from './singleComicView';

export interface MultipleComicView {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  listOfComics?: SingleComicView[];
}
