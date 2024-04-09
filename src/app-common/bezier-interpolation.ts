import {IFailure} from "@do-while-for-each/common";
import {IPoint} from "@do-while-for-each/math";

const tension = 0.7;

// рисование на канвасе
export function drawAsBezierInterpolation(context: CanvasRenderingContext2D, points: IPoint[], strokeStyle?: string): void {
  context.save();
  const data = prepareData(points);
  if (!data) return;
  const pathStr = bezierInterpolation(data, tension);
  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
  }
  context.stroke(new Path2D(pathStr));
  context.restore();
}

// отдает svg <path d="строковое значение">
export function getPathAsBezierInterpolation(points: IPoint[]): string {
  const data = prepareData(points);
  return data
    ? bezierInterpolation(data, tension)
    : '';
}


/**
 * Bezier Interpolation.
 * взято отсюда: https://codepen.io/osublake/pen/LGMexY
 * @param data - массив точек вида: [x1,y1, x2,y2,.. xN,yN]
 * @param tension - натяжение. Регулирует закругленность в узловых точках
 * @return path в виде строки
 */
function bezierInterpolation(data: number[], tension: number): string {

  const size = data.length;
  const last = size - 4;

  let path = "M" + data[0] + "," + data[1];

  for (let i = 0; i < size - 2; i += 2) {

    const x0 = i ? data[i - 2] : data[0];
    const y0 = i ? data[i - 1] : data[1];

    const x1 = data[i + 0];
    const y1 = data[i + 1];

    const x2 = data[i + 2];
    const y2 = data[i + 3];

    const x3 = i !== last ? data[i + 4] : x2;
    const y3 = i !== last ? data[i + 5] : y2;

    const _ = getControlPoints(x0, y0, x1, y1, x2, y2, x3, y3, tension);
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


function prepareData(points: IPoint[]): number[] | IFailure {
  if (points.length < 2) { // алгоритм работает,
    return false;          // когда есть хотя бы две точки
  }
  const data = [];
  for (const point of points) {
    data.push(point[0]);
    data.push(point[1]);
  }
  return data;
}
