export interface SingleComicView {
  id?: number;
  title?: string;
  issueNumber?: number;
  description?: string;
  modified?: Date;
  isbn?: string;
  format?: string;
  pageCount?: number;
  marvelUrl?: string;
  onSaleDate?: Date;
  printPrice?: number;
  thumbnail?: string;
  uncannyThumbnail?: string;
  creators: { name: string; role: string }[];
}
