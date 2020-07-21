import { SingleSeriesView } from './singleSeriesView';

export interface MultipleSeriesView {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  listOfSeries?: SingleSeriesView[];
}
