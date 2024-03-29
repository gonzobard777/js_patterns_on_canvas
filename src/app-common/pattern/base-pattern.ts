import {IPatternOpt} from "./contract";

export abstract class BasePattern {
  makeFill = false;
  makeStroke = false;

  protected constructor(protected context: CanvasRenderingContext2D,
                        protected opt: IPatternOpt,
  ) {
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
}
