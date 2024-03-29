import {IMatrix, IPoint, Matrix} from "@do-while-for-each/math";

abstract class BasePattern {
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

export class LinePattern extends BasePattern {

  constructor(private pattern: IPoint[],
              opt: IPatternOpt,
              context: CanvasRenderingContext2D,
  ) {
    super(context, opt);
  }

  draw(conv: IMatrix) {
    const points = this.pattern.map(p => Matrix.apply(conv, p));

    this.context.beginPath();
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (i === 0) {
        this.context.moveTo(point[0], point[1]);
        continue;
      }
      this.context.lineTo(point[0], point[1]);
    }

    if (this.makeFill) {
      this.context.fill();
    }
    if (this.makeStroke) {
      this.context.stroke();
    }
  }

}

export class ArcPattern extends BasePattern {
  pattern: Path2D;

  constructor(center: IPoint,
              radius: number,
              startAngle: number,
              endAngle: number,
              opt: IPatternOpt,
              context: CanvasRenderingContext2D,
  ) {
    super(context, opt);
    this.pattern = new Path2D();
    this.pattern.arc(center[0], center[1], radius, startAngle, endAngle);
  }

  draw(conv: IMatrix) {
    const path = new Path2D();
    path.addPath(this.pattern, {a: conv[0], b: conv[1], c: conv[2], d: conv[3], e: conv[4], f: conv[5]});
    if (this.makeFill) {
      this.context.fill(path);
    }
    if (this.makeStroke) {
      this.context.stroke(path);
    }
  }

}

export interface IPattern {
  draw(conv: IMatrix): void;
}


export interface IPatternOpt {
  lineDash?: number[]; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
  lineWidth?: number;
  fillStyle?: string;
  strokeStyle?: string; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
}
