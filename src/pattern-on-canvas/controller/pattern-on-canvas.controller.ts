import {IPoint, Matrix, Operator} from "@do-while-for-each/math";
import {points} from "../../app-common/constant";
import {drawAsBezierInterpolation, getPathAsBezierInterpolation} from "../../app-common/bezier-interpolation";
import * as pathProps from 'svg-path-properties';
import {ILineDrawOnCanvasOpt, LineDraw} from "../../app-common/draw-straight-line";

export class PatternOnCanvasController {

  context: CanvasRenderingContext2D;

  setElement(element: HTMLCanvasElement) {
    this.context = element.getContext('2d')!;
    this.render();
  }

  render() {
    drawAsBezierInterpolation(this.context, points);
    const svgProps = pathProps.svgPathProperties(getPathAsBezierInterpolation(points));
    drawSegmentsPerpendicularToPoint(this.context, svgProps, triangle, {strokeStyle: 'red', fillStyle: 'red'});
  }

  dispose() {

  }

}

const triangle: IPoint[] = [
  [-10, 0],
  [0, -10],
  [10, 0],
  [-10, 0],
];

function drawSegmentsPerpendicularToPoint(
  context: CanvasRenderingContext2D,
  svgProps: ReturnType<typeof pathProps.svgPathProperties>,
  points: IPoint[],
  opt: ILineDrawOnCanvasOpt,
): void {
  const lineDraw = new LineDraw(context, opt);
  for (let i = 20; i < svgProps.getTotalLength(); i += 50) {
    const point = svgProps.getPointAtLength(i);
    const tangent = svgProps.getTangentAtLength(i);
    const rotateAtPointAngle = Math.atan2(tangent.y, tangent.x);
    const conv = Matrix.multiply(
      Operator.rotateAtPoint([point.x, point.y], rotateAtPointAngle, 'rad'), // (2) повернуть
      [1, 0, 0, 1, point.x, point.y],                                        // (1) переместить все точки
    );
    lineDraw.run(
      points.map(p => Matrix.apply(conv, p))
    );
  }
}




