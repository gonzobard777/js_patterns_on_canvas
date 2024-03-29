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
    drawPattern(triangle, 20, 35, {strokeStyle: 'red', fillStyle: 'red'}, this.context, svgProps);
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
  pattern: IPoint[],
  start: number, // первая точка, от которой будет отрисовам паттерн, пиксели
  step: number, // шаг между точками отрисовки паттерна, пиксели
  opt: ILineDrawOnCanvasOpt, // настройки для отрисовки паттерна
  context: CanvasRenderingContext2D,
  svgProps: ReturnType<typeof pathProps.svgPathProperties>,
): void {
  const lineDraw = new LineDraw(context, opt);
  for (let i = start; i < svgProps.getTotalLength() - start; i += step) {
    const point = svgProps.getPointAtLength(i);
    const tangent = svgProps.getTangentAtLength(i);
    const tangentAngle = Math.atan2(tangent.y, tangent.x); // угол наклона касательной
    const conv = Matrix.multiply(
      Operator.rotateAtPoint([point.x, point.y], tangentAngle, 'rad'), // (2) повернуть
      [1, 0, 0, 1, point.x, point.y],                                  // (1) переместить все точки
    );
    lineDraw.run(
      pattern.map(p => Matrix.apply(conv, p))
    );

    // касательная прямая
    // const k = Math.tan(tangentAngle);
    // const b = point.y - k * point.x;
    // const x1 = point.x + 200;
    // const x2 = point.x - 200;
    // drawLine(context, [[x1, k * x1 + b], [x2, k * x2 + b]], {strokeStyle: 'blue'});
  }
}




