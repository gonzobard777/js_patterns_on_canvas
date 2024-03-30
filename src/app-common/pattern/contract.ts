import {IMatrix} from "@do-while-for-each/math";

export interface IPattern {
  draw(conv?: IMatrix): void;
}

export interface IPatternOpt {
  lineDash?: number[]; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
  lineWidth?: number;
  fillStyle?: string;
  strokeStyle?: string; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
}
