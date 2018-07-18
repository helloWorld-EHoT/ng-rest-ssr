export interface IEmo {
  emo: IEmoData;
  attrs: {fill}[];
  properties: IEmoProps;
  setIdx: number;
  setid: number;
  emoIdx: number;
}

export interface IEmoData {
  paths: string[];
  attrs: {fill}[];
  isMulticolor: boolean;
  isMulticolor2: boolean;
  grid: number;
  tags: string[];
}

export interface IEmoProps {
  order: number;
  id: number;
  name: string;
  prevSize: number;
  code: number;
  codes: number[];
}
