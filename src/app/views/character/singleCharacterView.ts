export interface SingleCharacterView {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  modified: Date;
  marvelUrl: string;
  standardThumbnail?: string;
  uncannyThumbnail?: string;
}
