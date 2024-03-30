import {IMatrix, IPoint, Matrix} from "@do-while-for-each/math";
import {BasePattern} from "./base-pattern";
import {IPatternOpt} from "./contract";

export interface IPointBasedPatternOpt extends IPatternOpt {
  points: IPoint[];
  radius: number;
}

/**
 * Паттерн для отрисовки точек.
 */
export class PointBasedPattern extends BasePattern {

  points: IPoint[];
  radius: number;

  constructor(opt: IPointBasedPatternOpt,
              context: CanvasRenderingContext2D,
  ) {
    super(context, opt);
    this.points = opt.points;
    this.radius = opt.radius;
  }

  draw(conv?: IMatrix): void {
    const points = conv ? this.points.map(p => Matrix.apply(conv, p)) : this.points;
    for (const point of points) {
      this.context.beginPath();
      this.context.arc(point[0], point[1], this.radius, 0, 2 * Math.PI);
      this.fillThenStroke();
    }
  }

}
