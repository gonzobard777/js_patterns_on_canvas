import {IMatrix, IPoint, Matrix} from "@do-while-for-each/math";
import {BasePattern} from "./base-pattern";
import {IPatternOpt} from "./contract";

/**
 * Паттерн состоящий из прямых линий.
 */
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
