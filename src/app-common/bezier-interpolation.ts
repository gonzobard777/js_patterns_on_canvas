import {IPoint} from "@do-while-for-each/math";
import {InterpolationFigureType} from "./constant";


// рисование на канвасе
export function drawAsBezierInterpolation(
  context: CanvasRenderingContext2D,
  type: InterpolationFigureType,
  points: IPoint[],
  tension: number,
  strokeStyle?: string
): void {
  context.save();
  const pathStr = getPathAsBezierInterpolation(type, points, tension);
  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
  }
  context.stroke(new Path2D(pathStr));
  context.restore();
}

// отдает svg <path d="строковое значение">
export function getPathAsBezierInterpolation(type: InterpolationFigureType, points: IPoint[], tension: number): string {
  switch (type) {
    case InterpolationFigureType.Line:
      return bezierLineInterpolation(points, tension);
  }
  return '';
}


/**
 * Bezier Interpolation.
 * изначально было взято отсюда: https://codepen.io/osublake/pen/LGMexY
 * Но потом модифицировано.
 * @param data - массив точек
 * @param tension - коэффициент сглаженности
 * @return path в виде строки
 */
function bezierLineInterpolation(data: IPoint[], tension?: number): string {

  if (data.length < 2) return '';

  const firstPoint = data[0];
  let path = "M" + firstPoint[0] + "," + firstPoint[1];

  const lastIndex = data.length - 2;

  for (let i = 0; i <= lastIndex; i++) {

    // если первая точка, то предыдущей еще нет
    const point0 = i === 0 ? data[0] : data[i - 1];
    const x0 = point0[0];
    const y0 = point0[1];

    const point1 = data[i];
    const x1 = point1[0];
    const y1 = point1[1];

    const point2 = data[i + 1];
    const x2 = point2[0];
    const y2 = point2[1];

    // последняя в цикле точка, то есть только следующая(point2), а вот следующая+1 уже нет
    const point3 = i === lastIndex ? point2 : data[i + 2];
    const x3 = point3[0];
    const y3 = point3[1];

    const _ = getControlPoints(x0, y0, x1, y1, x2, y2, x3, y3, tension);

    // не нужна первая контрольная точка, для первой точки
    if (i === 0) {
      _.cp1x = x1;
      _.cp1y = y1;
    }
    // не нужна вторая контрольная точка, для последней точки
    if (i === lastIndex) {
      _.cp2x = x2;
      _.cp2y = y2;
    }

    path += "C" +
      _.cp1x + "," + _.cp1y + "," +
      _.cp2x + "," + _.cp2y + "," +
      x2 + "," + y2;
  }

  return path;
}

/**
 * Interpolation with Bezier Curves.
 *   https://web.archive.org/web/20130308104133/http://www.antigrain.com/research/bezier_interpolation/index.html
 */
function getControlPoints(
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  tension = 1
) {
  const xc1 = (x0 + x1) / 2;
  const yc1 = (y0 + y1) / 2;
  const xc2 = (x1 + x2) / 2;
  const yc2 = (y1 + y2) / 2;
  const xc3 = (x2 + x3) / 2;
  const yc3 = (y2 + y3) / 2;

  const len1 = Math.hypot(x1 - x0, y1 - y0);
  const len2 = Math.hypot(x2 - x1, y2 - y1);
  const len3 = Math.hypot(x3 - x2, y3 - y2);

  let k1 = len1 / (len1 + len2);
  let k2 = len2 / (len2 + len3);

  k1 = Number.isNaN(k1) ? 0 : k1;
  k2 = Number.isNaN(k2) ? 0 : k2;

  const xm1 = xc1 + (xc2 - xc1) * k1;
  const ym1 = yc1 + (yc2 - yc1) * k1;

  const xm2 = xc2 + (xc3 - xc2) * k2;
  const ym2 = yc2 + (yc3 - yc2) * k2;

  // Resulting control points. Here smooth_value(tension) is mentioned
  // above coefficient K whose value should be in range [0...1].
  const cp1x = xm1 + (xc2 - xm1) * tension + x1 - xm1;
  const cp1y = ym1 + (yc2 - ym1) * tension + y1 - ym1;

  const cp2x = xm2 + (xc2 - xm2) * tension + x2 - xm2;
  const cp2y = ym2 + (yc2 - ym2) * tension + y2 - ym2;

  return {cp1x, cp1y, cp2x, cp2y};
}
