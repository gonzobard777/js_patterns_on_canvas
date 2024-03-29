import {IMatrix, IPoint} from "@do-while-for-each/math";
import {BasePattern} from "./base-pattern";
import {IPatternOpt} from "./contract";

/**
 * Паттерн состоящий из окружности.
 */
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
