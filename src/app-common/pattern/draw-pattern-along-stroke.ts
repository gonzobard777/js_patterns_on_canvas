import {Matrix, Operator} from "@do-while-for-each/math";
import * as pathProps from "svg-path-properties";
import {IPattern} from "./contract";

/**
 * Рисовать паттерн вдоль обводки.
 * @param pattern        - паттерн, который надо нарисовать
 * @param offsetFromEdge - отступ от краев, пиксели (по линии обводки)
 * @param step           - шаг между паттернами, пиксели (по линии обводки)
 * @param strokeExtends  - в этот объект парсится обводка: svgPathProperties("path строкой").
 *                         В нем реализованы полезные методы.
 */
export function drawPatternAlongStroke(
  pattern: IPattern,
  offsetFromEdge: number,
  step: number,
  strokeExtends: ReturnType<typeof pathProps.svgPathProperties>,
): void {

  for (let len = offsetFromEdge; len < strokeExtends.getTotalLength() - offsetFromEdge; len += step) {

    // угол наклона касательной
    const tangent = strokeExtends.getTangentAtLength(len);
    const tangentAngle = Math.atan2(tangent.y, tangent.x);

    const {x, y} = strokeExtends.getPointAtLength(len);

    // конвертер для позиционирования точек паттерна
    const conv = Matrix.multiply(
      Operator.rotateAtPoint([x, y], tangentAngle, 'rad'), // (2) повернуть
      [1, 0, 0, 1, x, y],                                  // (1) переместить все точки в точку касательной
    );

    pattern.draw(conv);
  }

}
