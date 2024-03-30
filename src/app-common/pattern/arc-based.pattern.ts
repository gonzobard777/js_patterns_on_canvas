import {IMatrix, IPoint} from "@do-while-for-each/math";
import {BasePattern} from "./base-pattern";
import {IPatternOpt} from "./contract";

export interface IArcBasedPatternOpt extends IPatternOpt {
  center: IPoint;
  radius: number;
  startAngle: number;
  endAngle: number;
}

/**
 * Паттерн, в основе которого окружность.
 */
export class ArcBasedPattern extends BasePattern {

  patternPath: Path2D;

  constructor(opt: IArcBasedPatternOpt,
              context: CanvasRenderingContext2D,
  ) {
    super(context, opt);
    this.patternPath = new Path2D();
    this.patternPath.arc(opt.center[0], opt.center[1], opt.radius, opt.startAngle, opt.endAngle);
  }

  draw(conv: IMatrix) {
    const path = new Path2D();
    path.addPath(
      this.patternPath,
      {a: conv[0], b: conv[1], c: conv[2], d: conv[3], e: conv[4], f: conv[5]}
    );
    this.fillThenStroke(path);
  }

}
