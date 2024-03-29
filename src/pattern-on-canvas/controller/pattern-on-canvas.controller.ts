import {IPoint, Matrix, Operator} from "@do-while-for-each/math";
import * as pathProps from 'svg-path-properties';
import {drawAsBezierInterpolation, getPathAsBezierInterpolation} from "../../app-common/bezier-interpolation";
import {LinePattern} from "../../app-common/pattern/line-pattern";
import {ArcPattern} from "../../app-common/pattern/arc-pattern";
import {IPattern} from "../../app-common/pattern/contract";
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

    const linePattern = new LinePattern(triangle, {strokeStyle: 'black'}, this.context);
    drawPatternAlongStroke(linePattern, 20, 35, svgProps);

    const arcPattern = new ArcPattern([0, 0], 7, Math.PI, 2 * Math.PI, {strokeStyle: 'black'}, this.context);
    drawPatternAlongStroke(arcPattern, 20, 35, svgProps);
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

/**
 * Рисовать паттерн вдоль обводки.
 * @param pattern        - паттерн, который надо нарисовать
 * @param offsetFromEdge - отступ с краев, пиксели (в длине обводки)
 * @param step           - шаг между паттернами, пиксели (в длине обводки)
 * @param strokeExtends  - в этот объект парсится обводка. В нем реализованы полезные методы.
 */
function drawPatternAlongStroke(
  pattern: IPattern,
  offsetFromEdge: number,
  step: number,
  strokeExtends: ReturnType<typeof pathProps.svgPathProperties>,
): void {
  for (let lenght = offsetFromEdge; lenght < strokeExtends.getTotalLength() - offsetFromEdge; lenght += step) {
    const {x, y} = strokeExtends.getPointAtLength(lenght);

    // угол наклона касательной
    const tangent = strokeExtends.getTangentAtLength(lenght);
    const tangentAngle = Math.atan2(tangent.y, tangent.x);

    // конвертер для позиционирования точек паттерна
    const conv = Matrix.multiply(
      Operator.rotateAtPoint([x, y], tangentAngle, 'rad'), // (2) повернуть
      [1, 0, 0, 1, x, y],                                  // (1) переместить все точки
    );

    pattern.draw(conv);

    // прямая касательная к точке на обводке
    // const k = Math.tan(tangentAngle);
    // const b = point.y - k * point.x;
    // const x1 = point.x + 200;
    // const x2 = point.x - 200;
    // drawLine(context, [[x1, k * x1 + b], [x2, k * x2 + b]], {strokeStyle: 'blue'});
  }
}
