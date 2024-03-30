import {IMatrix, IPoint, Matrix} from "@do-while-for-each/math";
import {BasePattern} from "./base-pattern";
import {IPatternOpt} from "./contract";

export interface ILineBasedPatternOpt extends IPatternOpt {
  points: IPoint[];
}

/**
 * Паттерн состоящий из прямых линий.
 */
export class LineBasedPattern extends BasePattern {

  points: IPoint[];

  constructor(opt: ILineBasedPatternOpt,
              context: CanvasRenderingContext2D,
  ) {
    super(context, opt);
    this.points = opt.points;
  }

  draw(conv: IMatrix) {
    const points = this.points.map(p => Matrix.apply(conv, p));

    this.context.beginPath();
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (i === 0) {
        this.context.moveTo(point[0], point[1]);
        continue;
      }
      this.context.lineTo(point[0], point[1]);
    }
    this.fillThenStroke();
  }

}
