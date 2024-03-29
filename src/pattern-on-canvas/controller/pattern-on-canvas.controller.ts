import {IPoint, Matrix, Operator} from "@do-while-for-each/math";
import * as pathProps from 'svg-path-properties';
import {drawAsBezierInterpolation, getPathAsBezierInterpolation} from "../../app-common/bezier-interpolation";
import {ArcPatternDrawer, IPatternDrawer, LinePatternDrawer} from "../../app-common/draw";
import {points} from "../../app-common/constant";

export class PatternOnCanvasController {

  context: CanvasRenderingContext2D;

  setElement(element: HTMLCanvasElement) {
    this.context = element.getContext('2d')!;
    this.render();
  }

  render() {
    drawAsBezierInterpolation(this.context, points);
    const svgProps = pathProps.svgPathProperties(getPathAsBezierInterpolation(points));

    const linePatternDraw = new LinePatternDrawer(triangle, {strokeStyle: 'black', fillStyle: 'white'}, this.context);
    drawPattern(linePatternDraw, 20, 35, svgProps);

    const arcPatternDraw = new ArcPatternDrawer([0, 0], 7, Math.PI, 2 * Math.PI, {strokeStyle: 'black', fillStyle: 'white'}, this.context);
    drawPattern(arcPatternDraw, 20, 35, svgProps);
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

function drawPattern(
  drawer: IPatternDrawer,
  start: number, // первая точка, от которой будет отрисовам паттерн, пиксели
  step: number, // шаг между точками отрисовки паттерна, пиксели
  svgProps: ReturnType<typeof pathProps.svgPathProperties>,
): void {
  for (let i = start; i < svgProps.getTotalLength() - start; i += step) {
    const point = svgProps.getPointAtLength(i);
    const tangent = svgProps.getTangentAtLength(i);
    const tangentAngle = Math.atan2(tangent.y, tangent.x); // угол наклона касательной
    const conv = Matrix.multiply(
      Operator.rotateAtPoint([point.x, point.y], tangentAngle, 'rad'), // (2) повернуть
      [1, 0, 0, 1, point.x, point.y],                                  // (1) переместить все точки
    );
    drawer.run(conv);

    // касательная прямая
    // const k = Math.tan(tangentAngle);
    // const b = point.y - k * point.x;
    // const x1 = point.x + 200;
    // const x2 = point.x - 200;
    // drawLine(context, [[x1, k * x1 + b], [x2, k * x2 + b]], {strokeStyle: 'blue'});
  }
}
