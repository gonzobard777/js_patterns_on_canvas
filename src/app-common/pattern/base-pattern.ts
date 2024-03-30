import {IMatrix} from "@do-while-for-each/math";
import {IPattern, IPatternOpt} from "./contract";

export abstract class BasePattern implements IPattern {

  context: CanvasRenderingContext2D;
  opt: IPatternOpt

  makeFill = false; // выполнять закраску
  makeStroke = false; // рисовать обводку

  protected constructor(context: CanvasRenderingContext2D, opt: IPatternOpt) {
    this.context = context;
    this.opt = opt;

    const {lineDash, lineWidth, fillStyle, strokeStyle} = opt;
    if (lineDash !== undefined) {
      context.setLineDash(lineDash);
    }
    if (lineWidth !== undefined) {
      context.lineWidth = lineWidth;
    }
    if (fillStyle !== undefined) {
      context.fillStyle = fillStyle;
      this.makeFill = true;
    }
    if (strokeStyle !== undefined) {
      context.strokeStyle = strokeStyle;
      this.makeStroke = true;
    }
  }

  abstract draw(conv?: IMatrix): void;

  fillThenStroke(path?: Path2D) {
    if (this.makeFill) {
      if (path) this.context.fill(path);
      else this.context.fill();
    }
    if (this.makeStroke) {
      if (path) this.context.stroke(path);
      else this.context.stroke();
    }
  }

}
